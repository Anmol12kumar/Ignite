const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
    levelNumber: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },

    content: [
        {
            topicTitle: String,
            text: String,
            examplePrompt: String,
            aiResponseExample: String
        }
    ],

    practiceTask: {
        instructions: String,
        hint: String,
        expectedKeywords: [String]
    },

    questions: [
        {
        questionText: String,
        options: [String],
        correctOptionIndex: Number
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Level", levelSchema);
