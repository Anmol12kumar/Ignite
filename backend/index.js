const cors = require("cors"); //Cross-Origin Resource Sharing middleware
const userRouter = require("./router/userRouter"); // Importing the user router module
const testGEMINI = require("./router/testGEMINI"); // Importing the testGEMINI module to test the Gemini API

const express = require("express");

const app = express(); // Creating an instance of the express application

const PORT = 5000; // Defining the port number for the server to listen on

app.use(
    cors({
    // Enabling CORS for all routes
    origin: "http://localhost:3000", // Allowing requests from any origin
    })
);

// Middleware to parse JSON request bodies
app.use(express.json());
app.use('/user', userRouter); // Mounting the userRouter on the '/user' path

app.get("/", (req, res) => {
    res.send("response from express");
});

app.get('/add', (req, res) => {
    res.send('response from add');
});

app.get('/getall', (req, res) => {
    res.send('response from getall');
});

app.delete('/delete', (req, res) => {
    res.send('response from delete');
});

app.put('/update', (req, res) => {
    res.send('response from update');
});

app.listen(PORT, () => {
  // Starting the server and listening on the defined port
  console.log("Server is running on port -" + PORT); // Logging a message to indicate the server is running
});

module.exports = app; // Exporting the app instance for use in other files