const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
        // If diffDays === 0, keep current streak (same day login)

        result.lastActiveDate = now;
        await result.save();
        // --- END STREAK LOGIC ---

        jwt.sign(
            { _id, email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            } else {
                res.status(200).json({ token, user: result });
            }
            },
        );
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// 3. Get All Users (Admin Dashboard ke liye)
router.get("/getall", (req, res) => {
    User.find()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

// 4. Update Score (Jab user game khelega)
router.put("/update-score/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, { score: req.body.score }, { new: true })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

// --- Baaki purane routes (delete, getbyid, etc.) ---

router.get("/getbyid/:id", (req, res) => {
    User.findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err));
});

router.delete("/delete/:id", (req, res) => { // Isko delete kar diya router.get se router.delete mein
    User.findByIdAndDelete(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;