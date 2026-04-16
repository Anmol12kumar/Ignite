const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

require('dotenv').config();

router.post("/add", (req, res) => {
    new User(req.body)
    .save()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email, password })
    .then(async (result) => {
        if (result) {
            const { _id, email, lastActiveDate } = result;

            const now = new Date();
            const last = new Date(lastActiveDate || 0);
            
            // --- STREAK LOGIC ---
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate());
            
            const diffDays = Math.floor((today - lastDay) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Logged in the very next day
                result.streak += 1;
            } else if (diffDays > 1) {
                // Missed a day (or more)
                result.streak = 1;
            } else if (diffDays === 0 && result.streak === 0) {
                // First time ever or after a long break where it was 0
                result.streak = 1;
            }

            result.lastActiveDate = now;
            await result.save();

            const token = jwt.sign(
                { _id, email, role: result.role },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: "5d" }
            );

            res.status(200).json({ 
                success: true, 
                token, 
                role: result.role || "user",
                streak: result.streak,
                name: result.name
            });
        } else {
            res.status(401).json({ success: false, message: "Invalid Username or Password" });
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/getall", (req, res) => {
    User.find()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get("/getbytoken", (req, res) => {
    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        User.findById(decoded._id)
        .then(user => {
            if (!user) return res.status(404).json({ message: "User not found" });
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json(err));
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
});

router.get("/getbyid/:id", (req, res) => {
    const { id } = req.params;
    User.findById(id)
    .then(user => {
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch user", error: err });
    });
});

// Get user progress (unlocked levels, XP, etc.)
router.get("/progress/:id", (req, res) => {
    const { id } = req.params;
    User.findById(id)
    .then(user => {
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({
            unlockedLevels: user.unlockedLevels || [1],
            xp: user.xp || 0,
            level: user.level || 1,
            streak: user.streak || 0,
            highestUnlockedLevel: Math.max(...(user.unlockedLevels || [1]))
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch progress", error: err });
    });
});

// Update unlocked levels when challenge is completed
router.post("/unlock-level", (req, res) => {
    const { token, levelNumber } = req.body;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const userId = decoded._id;

        User.findById(userId)
        .then(user => {
            if (!user) return res.status(404).json({ message: "User not found" });
            
            // Add level to unlockedLevels if not already there
            if (!user.unlockedLevels.includes(levelNumber)) {
                user.unlockedLevels.push(levelNumber);
            }
            
            user.save()
            .then(updatedUser => {
                res.status(200).json({
                    message: "Level unlocked",
                    unlockedLevels: updatedUser.unlockedLevels,
                    highestUnlockedLevel: Math.max(...updatedUser.unlockedLevels)
                });
            })
            .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
});

router.delete("/delete/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

module.exports = router;