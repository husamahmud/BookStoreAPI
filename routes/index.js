const express = require("express");
const router = express.Router();

const authorRoutes = require("./author");
const bookRoutes = require("./book");
const authRoutes = require("./auth");
const usersRoutes = require("./users");
const passwordRoutes = require("./password");
const imageRoutes = require("./upload");

router.use("/authors", authorRoutes);
router.use("/books", bookRoutes);
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/password", passwordRoutes);
router.use("/", imageRoutes);

module.exports = router;
