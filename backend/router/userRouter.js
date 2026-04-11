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
        res.status(401).json({ error: "Invalid credentials" });
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;