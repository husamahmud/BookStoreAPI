const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

router.use(express.json());
const {User} = require("../models/User");

const generateResetLink = asyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(404).json({error: "User not found"});

    const secret = process.env.SECRET_KEY + user.password;
    const token = jwt.sign({
        email: user.email,
        id: user._id
    }, secret, {expiresIn: "10m"});

    const link = `${process.env.BASE_URL}/api/password/rest-password-link/${user._id}/${token}`;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: user.email,
        subject: "Reset Password",
        html:
            `
                <div>
                    <h4>Click the link below to reset your password</h4>
                    <a href="${link}">Reset My Password</a>
                </div>
            `
    };

    transporter.sendMail(mailOptions, function (error, success) {
        if (error) console.error(error);
        else return console.log("Email sent" + success.response);
    });
});

const resetPassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userID);
    if (!user) return res.status(404).json({error: "User not found"});

    const secret = process.env.SECRET_KEY + user.password;
    try {
        jwt.verify(req.params.token, secret);
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        user.password = req.body.password;
        await user.save();
        res.status(200).json({
            message: "Password reset successfully",
        });
    } catch (error) {
        console.error(error);
        res.json({error: "Token verification failed"});
    }
});

module.exports = {generateResetLink, resetPassword};
