const express = require("express");
const mongoose = require("mongoose");
const app = express();
const {notFound, errorHandler} = require("./middlewares/errors");
const logger = require("./middlewares/logger");
const authorPath = require("./routes/author");
const bookPath = require("./routes/book");
const authPath = require("./routes/auth");
const usersPath = require("./routes/users");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(logger);

// set up path routers for API endpoints
app.use("/api/authors", authorPath);
app.use("/api/books", bookPath);
app.use("/api/auth", authPath);
app.use("/api/users", usersPath);

// connect to MongoDB database
mongoose
    .connect(process.env.MONGO_URI)
    .catch((error) => console.error("MongoDB connection error:", error));

// once the MongoDB connection is open, log a success message
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB database");
});

// if there is an error in the MongoDB connection, log the error
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

const PORT = process.env.PORT;

// error handler middleware
app.use(notFound);
app.use(errorHandler);

// start the server and listen to the specific port
app.listen(PORT, (error) => {
    if (error) console.error("Server start error:", error); else console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
