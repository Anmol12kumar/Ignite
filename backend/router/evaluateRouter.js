const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const jwt = require("jsonwebtoken");
const Evaluation = require("../models/evaluationModel");
require("dotenv").config();

const router = express.Router();
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

router.post("/", async (req, res) => {
  try {
    const { userPrompt, question, sampleAnswer, keyPoints, token } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an AI assistant evaluating an assessment for a "prompt engineering" course.

Question: ${question}
Expected Key Points: ${keyPoints.join(", ")}
Sample Answer: ${sampleAnswer}

User's Attempt: ${userPrompt}

Analyze the User's Attempt based on the Expected Key Points.
Return ONLY a strictly valid JSON object without any markdown formatting or code blocks with the following structure:
{
    "pct": <integer between 0 and 100 representing accuracy score>,
    "matched": [<array of strings of key points they successfully addressed>],
    "missed": [<array of strings of key points they missed or failed to effectively address>],
    "suggestions": "<string providing brief constructive suggestions to correct bugs, fix the prompt, and improve accuracy>"
}`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();

    // Clean markdown backticks if any
    if (responseText.startsWith("```")) {
      const matches = responseText.match(/```(?:json)?([\s\S]+?)```/);
      if (matches) {
        responseText = matches[1].trim();
      }
    }

    const evaluation = JSON.parse(responseText);

    let userId = null;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded._id;
      } catch (err) {
        console.log(
          "Token verification failed for saving evaluation:",
          err.message,
        );
      }
    }

    const newEval = new Evaluation({
      userId,
      question,
      userPrompt,
      pct: evaluation.pct,
      matched: evaluation.matched || [],
      missed: evaluation.missed || [],
      suggestions: evaluation.suggestions,
    });

    await newEval.save();

    res.json({ ...evaluation, _historyId: newEval._id });
  } catch (error) {
    console.error("Evaluation Error:", error);
    res.status(500).json({ error: error.message || "Failed to evaluate" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const history = await Evaluation.find({ userId: decoded._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(history);
  } catch (error) {
    console.error("History Error:", error);
    res.status(500).json({ error: error.message || "Failed to fetch history" });
  }
});

module.exports = router;
