require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const aiOptions = process.env.GEMINI_API_KEY ? { apiKey: process.env.GEMINI_API_KEY } : {};
const ai = new GoogleGenAI(aiOptions);

async function main() {
    const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
    for (let m of models) {
        try {
            console.log("Trying", m);
            const response = await ai.models.generateContent({
                model: m,
                contents: "hello",
            });
            console.log("SUCCESS on", m);
            return;
        } catch (e) {
            console.log("FAILED on", m, e.message);
        }
    }
}
main();
