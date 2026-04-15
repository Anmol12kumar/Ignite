const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
require("dotenv").config();

// 1. Signup Route (Default User)
router.post("/add", (req, res) => {
    new User(req.body) // req.body mein role nahi bhejenge to model default "user" le lega
    .save()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// 2. Login Route (ROLE BHEJNA ZAROORI HAI)
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email, password })
    .then((result) => {
        if (result) {
            const { _id, email, role } = result; // Role yahan se nikalenge

            jwt.sign(
                { _id, email, role }, // Payload mein role add kiya
                process.env.JWT_SECRET,
                { expiresIn: "2h" },
                (err, token) => {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        // Frontend ko token ke saath role bhi bhej rahe hain
                        res.status(200).json({ token, role, email });
                    }
                }
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