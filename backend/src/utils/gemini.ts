import { GoogleGenAI } from '@google/genai';

/**
 * Sends a prompt to the Gemini 2.0 Flash model with a given system instruction
 * and returns the model's text response.
 *
 * Uses the new unified @google/genai SDK (replaces the legacy
 * @google/generative-ai package).
 *
 * Used for two generation tasks during blog creation:
 *   1. Tag generation       — TAG_INSTRUCTION from config/prompts.ts
 *   2. Description generation — DESCRIPTION_INSTRUCTION from config/prompts.ts
 *
 * @param content           - The blog's HTML content (used as the user prompt)
 * @param systemInstruction - Shapes what kind of response Gemini returns
 * @param apiKey            - Gemini API key from the Workers environment
 * @returns                 - Generated text, or null if the API call fails
 */
export async function generateAIContent(
  content: string,
  systemInstruction: string,
  apiKey: string
): Promise<string | null> {
  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: content,
      config: { systemInstruction },
    });

    return response.text?.trim() ?? null;
  } catch (err) {
    // Log but don't crash the blog creation request — callers handle null.
    console.error('[Gemini] Content generation failed:', err);
    return null;
  }
}
