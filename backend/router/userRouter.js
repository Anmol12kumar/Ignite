const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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
            
            // --- STREAK LOGIC ---
            // Check if this is the user's first login
            const isFirstLogin = !lastActiveDate || lastActiveDate === null;
            
            if (isFirstLogin) {
                // First time user - initialize streak to 1
                result.streak = 1;
            } else {
                // Existing user - calculate days since last login
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const lastDay = new Date(lastActiveDate.getFullYear(), lastActiveDate.getMonth(), lastActiveDate.getDate());
                
                const diffDays = Math.floor((today - lastDay) / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    // Logged in the very next day - increment streak
                    result.streak += 1;
                } else if (diffDays > 1) {
                    // Missed a day (or more) - reset streak to 0
                    result.streak = 0;
                }
                // If diffDays === 0, keep streak as is (same day re-login)
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

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Forgot Password - Generate reset token and send email
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "No user found with this email address" 
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

        // Save token to user
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // Create reset link
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&email=${email}`;

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "🔐 Ignite - Password Reset Request",
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <h2 style="color: #10b981; text-align: center;">Ignite</h2>
                        <h3 style="color: #333;">Password Reset Request</h3>
                        <p style="color: #666;">Hello ${user.name},</p>
                        <p style="color: #666;">We received a request to reset your password. Click the button below to create a new password.</p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetLink}" style="background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                                Reset Password
                            </a>
                        </div>

                        <p style="color: #999; font-size: 12px;">Or copy this link: <br/><a href="${resetLink}" style="color: #10b981;">${resetLink}</a></p>
                        
                        <p style="color: #666; font-size: 14px;">This link will expire in 15 minutes.</p>
                        <p style="color: #666; font-size: 14px;">If you didn't request a password reset, please ignore this email.</p>
                        
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="color: #999; font-size: 12px; text-align: center;">© 2024 Ignite. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ 
            success: true, 
            message: "Password reset link has been sent to your email. Check your inbox!" 
        });

    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Unable to send reset email. Please try again later." 
        });
    }
});

// Reset Password - Verify token and update password
router.post("/reset-password", async (req, res) => {
    const { token, email, newPassword } = req.body;

    if (!token || !email || !newPassword) {
        return res.status(400).json({ message: "Token, email, and new password are required" });
    }

    try {
        const user = await User.findOne({ 
            email: email.toLowerCase(),
            resetToken: token 
        });

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "Invalid email or reset token" 
            });
        }

        // Check if token has expired
        if (new Date() > user.resetTokenExpiry) {
            return res.status(400).json({ 
                success: false, 
                message: "Reset link has expired. Please request a new one." 
            });
        }

        // Update password
        user.password = newPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "Password has been reset successfully. Please login with your new password." 
        });

    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Unable to reset password. Please try again." 
        });
    }
});

module.exports = router;