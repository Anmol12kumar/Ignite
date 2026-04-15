require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function testGEMINI() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = "Explain MERN stack in one sentence.";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log("Gemini Response:", response.text());
    } catch (error) {
        console.log("Error:", error.message);
    }
}

testGEMINI();        