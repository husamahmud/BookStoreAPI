const express = require("express");
const app = express();
const {notFound, errorHandler} = require("./middlewares/errors");
const logger = require("./middlewares/logger");
const authorPath = require("./routes/author");
const bookPath = require("./routes/book");
const authPath = require("./routes/auth");
const usersPath = require("./routes/users");
const connectToDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(logger);

// set up path routers for API endpoints
app.use("/api/authors", authorPath);
app.use("/api/books", bookPath);
app.use("/api/auth", authPath);
app.use("/api/users", usersPath);

// connect t database
connectToDB();

const PORT = process.env.PORT;

// error handler middleware
app.use(notFound);
app.use(errorHandler);

// start the server and listen to the specific port
app.listen(PORT, (error) => {
    if (error) console.error("Server start error:", error); else console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
