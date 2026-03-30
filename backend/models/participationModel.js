const { Schema, model } = require("../connection");

const participationSchema = new Schema(
    {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    level: { type: Number, required: true },
    challengeName: { type: String, required: true },
    prompt: { type: String, required: true },
    response: { type: String, default: "" },
    score: { type: Number, default: 0, min: 0, max: 100 },
    xpEarned: { type: Number, default: 0 },
    passed: { type: Boolean, default: false },
    timeTakenSeconds: { type: Number, default: 0 },
    attemptNumber: { type: Number, default: 1 },
    },{ timestamps: true },
);

module.exports = model("users", participationSchema);
