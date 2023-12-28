const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
    authorizeTokenAndPermissions, authorizeTokenAndAdmin
} = require("../middlewares/verifyToken");

router.use(express.json());

const {
    User, validateUpdateUser
} = require("../models/User");

/**
 * Update user
 * @route PUT /api/users/:id
 **/
router.put("/:id", authorizeTokenAndPermissions, asyncHandler(async (req, res) => {
    if (req.user.id !== req.params.id) return res.status(403).json({message: "Access denied"});

    const {error} = validateUpdateUser(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        }
    }, {new: true}).select("-password");
    res.status(200).json({message: "User updated successfully", updatedUser});
}));

/**
 * Get all users
 * @route Get /api/users
 **/
router.get("/", authorizeTokenAndAdmin, asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
}));

/**
 * Get user by ID
 * @route PUT /api/users/:id
 **/
router.get("/:id", authorizeTokenAndPermissions, asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) return res.status(200).json(user);
    else return res.status(404).json({error: "User not found"});
}));

/**
 * Delete user by ID
 * @route PUT /api/users/delete/:id
 **/
router.delete("/delete/:id", authorizeTokenAndPermissions, asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) return res.status(200).json({message: "User has been deleted successfully"});
    else return res.status(404).json({error: "User not found"});
}));

module.exports = router;
