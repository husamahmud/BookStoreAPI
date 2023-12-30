const express = require("express");
const router = express.Router();

const {
    generateResetLink,
    resetPassword
} = require("../controllers/passwordController");

/**
 * Send reset password link
 * @route POST /rest-password-link
 **/
router.post("/rest-password-link", generateResetLink);

/**
 * Reset the password
 * @route POST /rest-password-link/:userID/:token
 **/
router.post("/rest-password-link/:userID/:token", resetPassword);

module.exports = router;
