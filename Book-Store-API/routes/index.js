const express = require("express");
const router = express.Router();

const authorRoutes = require("./author");
const bookRoutes = require("./book");
const authRoutes = require("./auth");
const usersRoutes = require("./users");
const passwordRoutes = require("./password");

router.use("/authors", authorRoutes);
router.use("/books", bookRoutes);
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/password", passwordRoutes);

module.exports = router;
