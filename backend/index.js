const cors = require("cors"); //Cross-Origin Resource Sharing middleware

const express = require("express");

const app = express(); // Creating an instance of the express application

const PORT = 5000; // Defining the port number for the server to listen on

app.use(
    cors({
    // Enabling CORS for all routes
    origin: "*", // Allowing requests from any origin
    })
);

// Middleware to parse JSON request bodies
app.use(express.json());

app.get("/", (req, res) => {
    res.send("response from express");
});

app.listen(PORT, () => {
  // Starting the server and listening on the defined port
  console.log("Server is running on port -" + PORT); // Logging a message to indicate the server is running
});

module.exports = app; // Exporting the app instance for use in other files