require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const aiOptions = process.env.GEMINI_API_KEY ? { apiKey: process.env.GEMINI_API_KEY } : {};
const ai = new GoogleGenAI(aiOptions);

const prompt = `Format the response cleanly in JSON format with {"notes": "abc", "recommendedVideos": []}`;

async function main() {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });
        console.log("SUCCESS:", response.text);
    } catch(e) {
        console.error("FAILED:", e.message);
    }
}
main();
