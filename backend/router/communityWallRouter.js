const express = require("express");
const router = express.Router();
const CommunityWall = require("../models/communityWallModel");

// GET all messages
router.get("/", (req, res) => {
    CommunityWall.find()
        .sort({ created_at: -1 })
        .then((messages) => {
            res.status(200).json(messages);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// POST new message
router.post("/add", (req, res) => {
    const { author_name, content, userId } = req.body;

    if (!content || !content.trim()) {
        return res.status(400).json({ message: "Message content is required" });
    }

    const newMessage = new CommunityWall({
        author_name: author_name || "Anonymous",
        content: content.trim(),
        userId: userId || null,
        likes: 0,
        dislikes: 0,
    });

    newMessage
        .save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// UPDATE likes
router.put("/like/:id", (req, res) => {
    CommunityWall.findByIdAndUpdate(
        req.params.id,
        { $inc: { likes: 1 } },
        { new: true }
    )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// UPDATE dislikes
router.put("/dislike/:id", (req, res) => {
    CommunityWall.findByIdAndUpdate(
        req.params.id,
        { $inc: { dislikes: 1 } },
        { new: true }
    )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// DELETE message
router.delete("/delete/:id", (req, res) => {
    CommunityWall.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

module.exports = router;
