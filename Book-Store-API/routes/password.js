const express = require("express");
const router = express.Router();

const {
    generateResetLink,
    resetPassword
} = require("../controllers/passwordController");

/**
 * Send reset password link
 * @route /rest-password-link
 **/
router.post("/rest-password-link", generateResetLink);

/**
 * Reset the password
 * @route /rest-password-link/:userID/:token
 **/
router.post("/rest-password-link/:userID/:token", resetPassword);

module.exports = router;
