const express = require("express");
const app = express();

const {notFound, errorHandler} = require("./middlewares/errors");
const logger = require("./middlewares/logger");
const routes = require("./routes");
const connectToDB = require("./config/db");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, "images")));

// set up path routers for API endpoints
app.use("/api", routes);

// connect to database
connectToDB();

const PORT = process.env.PORT || 3000;

// error handler middleware
app.use(notFound);
app.use(errorHandler);

// start the server and listen to the specific port
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
