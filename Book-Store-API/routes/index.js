const express = require("express");
const router = express.Router();

const authorRoutes = require("./author");
const bookRoutes = require("./book");
const authRoutes = require("./auth");
const usersRoutes = require("./users");

router.use("/authors", authorRoutes);
router.use("/books", bookRoutes);
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);

module.exports = router;
