const { Schema, model, Types } = require("../connection");

const mySchema = new Schema(
    {
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    name: { type: String },
    totalXP: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    challengesCompleted: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    },
    { timestamps: true },
);

module.exports = model("leaderboard", mySchema);
