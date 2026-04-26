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
    const { userPrompt, question, sampleAnswer, keyPoints, token, profession, domain, experienceLevel } = req.body;

    // Build personalization context for Gemini
    const professionLabel = profession || "student";
    const domainLabel = domain || "general";
    const levelLabel = experienceLevel || "beginner";

    const personalizationContext = `
The user is a ${professionLabel} with a focus on ${domainLabel}. Their experience level is ${levelLabel}.
Tailor your feedback accordingly:
- For a beginner: use simple language, avoid jargon, be encouraging.
- For intermediate: be direct and suggest specific improvements.
- For advanced: use technical depth, point out subtle nuances.
- For a teacher: frame suggestions in terms of how they could apply this in teaching.
- For a developer: tie suggestions to real-world code/system context.
- For a researcher: emphasize precision, methodology, and evidence-based framing.
- For a marketer: relate examples to campaigns, copy, and audience targeting.
- For a healthcare professional: use clinical or patient-communication analogies.
- For a legal-finance professional: emphasize precision, compliance, and formal tone.
Adapt the domain-specific examples in your suggestions to be relevant to "${domainLabel}".
`;

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `You are an AI assistant evaluating an assessment for a "prompt engineering" course.

${personalizationContext}

Question: ${question}
Expected Key Points: ${keyPoints.join(", ")}
Sample Answer: ${sampleAnswer}

User's Attempt: ${userPrompt}

Analyze the User's Attempt based on the Expected Key Points.
Return a valid JSON object with this exact structure:
{
    "pct": number (0-100),
    "matched": string[],
    "missed": string[],
    "suggestions": string
}`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();

    // Safety cleanup in case of stray markers
    responseText = responseText.replace(/^```json\s*/i, "").replace(/\s*```$/i, "");
    
    let evaluation;
    try {
        evaluation = JSON.parse(responseText);
    } catch (parseError) {
        console.error("Primary JSON parse failed, attempting regex recovery. Text:", responseText);
        // Fallback: try to find the first { and last } to isolate JSON
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                evaluation = JSON.parse(jsonMatch[0]);
            } catch (e) {
                throw new Error("Failed to parse AI evaluation response as JSON");
            }
        } else {
            throw new Error("No JSON structure found in AI response");
        }
    }


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
