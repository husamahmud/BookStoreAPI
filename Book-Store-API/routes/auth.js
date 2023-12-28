const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.use(express.json());

const {
    User, validateRegisterUser, validateLoginUser
} = require("../models/User");

/**
 * Register a new user
 * @route POST /api/auth/register
 **/
router.post("/register", asyncHandler(async (req, res) => {
    const {error} = validateRegisterUser(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).json({error: "This email is already registered"});

    // generating a random salt and hashing the password with the salt
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    });

    const newUser = await user.save();
    const token = jwt.sign({
        id: user._id, isAdmin: user.isAdmin
    }, process.env.SECRET_KEY, {expiresIn: "30d"});
    // include all properties of newUser._doc, except for the password
    const {password, ...userDate} = newUser._doc;

    res.status(201).json({
        message: "User registered successfully", ...userDate, token
    });
}));

/**
 * Login user
 * @route POST /api/auth/login
 **/
router.post("/login", asyncHandler(async (req, res) => {
    const {error} = validateLoginUser(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json({error: "Invalid email or password"});

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) return res.status(400).json({error: "Invalid email or password"});

    const token = jwt.sign({
        id: user._id, isAdmin: user.isAdmin
    }, process.env.SECRET_KEY, {expiresIn: "30d"});
    const {password, ...userDate} = user._doc;
    res.status(200).json({
        message: "User logged in successfully", ...userDate, token
    });
}));

module.exports = router;
