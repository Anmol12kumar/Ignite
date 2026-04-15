const cors = require("cors");
require("./connection");
const userRouter = require("./router/userRouter");
const evaluateRouter = require("./router/evaluateRouter");

const User = require("./models/userModel"); // 1. User Model ko import karein

const leaderboardRouter = require("./router/leaderboardRouter");


const express = require("express");
const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use('/user', userRouter);
app.use('/evaluate', evaluateRouter);
app.use('/leaderboard', leaderboardRouter);

app.get("/", (req, res) => {
    res.send("response from express");
});

app.listen(PORT, () => {
  console.log("Server is running on port -" + PORT);
});

module.exports = app;