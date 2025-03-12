import { scrypt } from 'scrypt-js';

export function calculateMinuteRead(content: string, wordsPerMinute: number = 200): number {
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

export async function hashPassword(password: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const N = 1024, r = 8, p = 1, dkLen = 32;
    const derivedKey = await scrypt(
        new TextEncoder().encode(password),
        salt,
        N,
        r,
        p,
        dkLen
    );
    return btoa(String.fromCharCode(...salt, ...new Uint8Array(derivedKey)));
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const decoded = atob(hashedPassword);
    const salt = new Uint8Array(decoded.slice(0, 16).split('').map(c => c.charCodeAt(0)));
    const storedHash = new Uint8Array(decoded.slice(16).split('').map(c => c.charCodeAt(0)));

    const N = 1024, r = 8, p = 1, dkLen = 32;
    const derivedKey = await scrypt(
        new TextEncoder().encode(password),
        salt,
        N,
        r,
        p,
        dkLen
    );

    // Constant-time comparison
    if (derivedKey.length !== storedHash.length) {
        return false;
    }

    let diff = 0;
    for (let i = 0; i < derivedKey.length; i++) {
        diff |= derivedKey[i] ^ storedHash[i];
    }
    return diff === 0;
}