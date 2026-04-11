const { Schema, model } = require("../connection");

const evaluationSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'users', default: null },
        question: { type: String, required: true },
        userPrompt: { type: String, required: true },
        pct: { type: Number, required: true },
        matched: { type: [String], default: [] },
        missed: { type: [String], default: [] },
        suggestions: { type: String, default: "" },
    },
    { timestamps: true }
);

module.exports = model("evaluations", evaluationSchema);
