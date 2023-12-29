const express = require("express");
const router = express.Router();
const {
    authorizeTokenAndPermissions, authorizeTokenAndAdmin
} = require("../middlewares/verifyToken");
const {
    updateUser, getAllUsers, getUserByID, deleteUser
} = require("../controllers/userController");

router.use(express.json());

/**
 * Update user
 * @route PUT /api/users/:id
 **/
router.put("/:id", authorizeTokenAndPermissions, updateUser);

/**
 * Get all users
 * @route Get /api/users
 **/
router.get("/", authorizeTokenAndAdmin, getAllUsers);

/**
 * Get user by ID
 * @route PUT /api/users/:id
 **/
router.get("/:id", authorizeTokenAndPermissions, getUserByID);

/**
 * Delete user by ID
 * @route PUT /api/users/delete/:id
 **/
router.delete("/:id", authorizeTokenAndPermissions, deleteUser);

module.exports = router;
