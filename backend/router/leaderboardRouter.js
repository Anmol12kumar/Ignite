const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/leaderboardModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

router.post('/update', async (req, res) => {
    try {
        const { token, xpToAdd } = req.body;
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.xp += xpToAdd;
        user.level = Math.floor(user.xp / 1000) + 1;
        await user.save();

        let entry = await Leaderboard.findOne({ userId });
        
        if (!entry) {
            entry = new Leaderboard({
                userId,
                name: user.name,
                totalXP: user.xp,
                level: user.level,
                challengesCompleted: 1,
            });
        } else {
            entry.totalXP = user.xp;
            entry.level = user.level;
            entry.challengesCompleted += 1;
        }

        await entry.save();
        res.status(200).json({ message: "Score saved", xp: user.xp, level: user.level });
    } catch (err) {
        console.error("Leaderboard update error:", err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const topPlayers = await Leaderboard.find().sort({ totalXP: -1 }).limit(50);
        res.status(200).json(topPlayers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
