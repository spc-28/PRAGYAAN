import { GoogleGenerativeAI } from "@google/generative-ai";

export const getTags = async (prompt: string, systemInstruction: string, key: string) => {
    try {
        const genAI = new GoogleGenerativeAI(key);
        
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction
        });
        
        const result = await model.generateContent(prompt);

        return result.response.text();

    }
    catch(e) {
        return {
            message: "Invalid",
            error: e
        };
    }

}

