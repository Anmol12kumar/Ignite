const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/add", (req, res) => {
    console.log(req.body);
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

router.get("/getbyemail/:email", (req, res) => {
    User.findOne({ email: req.params.email })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/getbycity/:city", (req, res) => {
    User.find({ city: req.params.city })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/getall", (req, res) => {
  // res.send('response from getall user');
    User.find()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/getbyid/:id", (req, res) => {
    User.findById(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

router.get("/delete/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

router.put("/update/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/authenticate", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email, password })
    .then((result) => {
        if (result) {
        const { _id, email } = result;

        jwt.sign(
            { _id, email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            } else {
                res.status(200).json({ token });
            }
            },
        );
        } else {
        console.log(err);
        res.status(500).json(err);
        }
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

        // --- STREAK LOGIC ---
        const now = new Date();
        const last = new Date(lastActiveDate || 0);

        // Reset hours/minutes to compare just the calendar day
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

module.exports = router;