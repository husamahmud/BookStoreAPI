const express = require("express");
const mongoose = require("mongoose");
const app = express();

const authorPath = require("./routes/author");

// use the author path router to all requests starting with "/api/authors"
app.use("/api/authors", authorPath);

// connect to MongoDB database
mongoose
    .connect("mongodb://localhost/BookStoreDB")
    .catch((error) => console.error("MongoDB connection error:", error));

// once the MongoDB connection is open, log a success message
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB database");
});

// if there is an error in the MongoDB connection, log the error
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

const PORT = 3000;

// start the server and listen to the specific port
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
