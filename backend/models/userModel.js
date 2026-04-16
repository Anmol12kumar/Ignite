const { Schema, model } = require("../connection");

const mySchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        avatar: { type: String, default: null },
        
        role: { type: String, enum: ["user", "admin"], default: "user" },
        score: { type: Number, default: 0 }, // Dashboard par dikhane ke liye total score
        level: { type: Number, default: 1 },
        xp: { type: Number, default: 0 },
        streak: { type: Number, default: 0 },
        
        lastActiveDate: { type: Date, default: Date.now },
        
        badges: [
            {
                badgeId: String,
                title: String,
                icon: String,
                description: String,
                earnedAt: { type: Date, default: Date.now },
            },
        ],
        unlockedLevels: { type: [Number], default: [1] },
    },
    { timestamps: true } 
);

module.exports = model("users", mySchema);