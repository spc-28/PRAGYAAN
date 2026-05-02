import { scrypt } from 'scrypt-js';

// scrypt parameters — chosen to be fast enough for edge workers while
// still being prohibitively expensive to brute-force.
const SCRYPT_N = 1024; // CPU / memory cost factor
const SCRYPT_R = 8;    // block size
const SCRYPT_P = 1;    // parallelisation factor
const DK_LEN   = 32;   // derived key length in bytes
const SALT_LEN = 16;   // random salt length in bytes

/**
 * Hashes a plain-text password using scrypt.
 *
 * Storage format: base64( 16-byte-salt || 32-byte-derivedKey )
 * The salt is prepended to the derived key so a single field stores
 * everything needed for verification.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LEN));
  const derivedKey = await scrypt(
    new TextEncoder().encode(password),
    salt,
    SCRYPT_N,
    SCRYPT_R,
    SCRYPT_P,
    DK_LEN
  );
  // Concatenate salt + derivedKey then base64-encode for safe DB storage
  return btoa(String.fromCharCode(...salt, ...new Uint8Array(derivedKey)));
}

/**
 * Verifies a plain-text password against a stored scrypt hash.
 *
 * Uses a bitwise XOR loop (constant-time comparison) to prevent
 * timing attacks that could leak information about the hash value.
 */
export async function comparePassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  const decoded   = atob(storedHash);
  const salt      = new Uint8Array(decoded.slice(0, SALT_LEN).split('').map(c => c.charCodeAt(0)));
  const savedKey  = new Uint8Array(decoded.slice(SALT_LEN).split('').map(c => c.charCodeAt(0)));

  const derivedKey = await scrypt(
    new TextEncoder().encode(password),
    salt,
    SCRYPT_N,
    SCRYPT_R,
    SCRYPT_P,
    DK_LEN
  );

  if (derivedKey.length !== savedKey.length) return false;

  // Constant-time comparison — every byte is always checked
  let diff = 0;
  for (let i = 0; i < derivedKey.length; i++) {
    diff |= derivedKey[i] ^ savedKey[i];
  }
  return diff === 0;
}
