const express = require("express");
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/authorController");

router.use(express.json());

/**
 * Register a new user
 * @route POST /api/auth/register
 **/
router.post("/register", registerUser);

/**
 * Login user
 * @route POST /api/auth/login
 **/
router.post("/login", loginUser);

module.exports = router;
