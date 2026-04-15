const cors = require("cors");
require("./connection");
const userRouter = require("./router/userRouter");
const evaluateRouter = require("./router/evaluateRouter");
const User = require("./models/userModel"); // 1. User Model ko import karein
const express = require("express");
const app = express();
const PORT = 5000;

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(express.json());

// --- ADMIN CHECK MIDDLEWARE ---
// Ye function check karega ki request bhejne wala admin hai ya nahi
const isAdmin = async (req, res, next) => {
    const { email } = req.headers; // Hum header se email bhejenge check karne ke liye
    
    const user = await User.findOne({ email: email });
    
    if (user && user.role === "admin") {
        next(); // Agar admin hai toh aage badhne do
    } else {
        res.status(403).send("Access Denied: Sirf Admin hi badlav (Update/Delete) kar sakta hai!");
    }
};
app.use('/user', userRouter);
app.use('/evaluate', evaluateRouter);

app.get("/", (req, res) => {
    res.send("response from express");
});
// 2. Ab 'isAdmin' ko delete aur update routes mein add kar dein
app.delete('/delete', isAdmin, (req, res) => {
    res.send('Admin ne delete request allow kar di!');
});
app.put('/update', isAdmin, (req, res) => {
    res.send('Admin ne update request allow kar di!');
});
app.listen(PORT, () => {
    console.log("Server is running on port -" + PORT);
});
module.exports = app;