const express = require("express");
const router = express.Router();
const {authorizeTokenAndAdmin} = require("../middlewares/verifyToken");

const {
    getAllAuthors, getAuthorByID, createAuthor, updateAuthor, deleteAuthor
} = require("../controllers/authorController");

router.use(express.json());

/**
 * Get all authors
 * @route GET /
 **/
router.get("/", getAllAuthors);

/**
 * Get a specific author by ID
 * @route GET /:id
 **/
router.get("/:id", getAuthorByID);

/**
 * Create a new author
 * @route POST /add
 **/
router.post("/add", authorizeTokenAndAdmin, createAuthor);

/**
 * Update an existing author
 * @route PUT /update/:id
 **/
router.put("/update/:id", authorizeTokenAndAdmin, updateAuthor);

/**
 * Delete an author by ID
 * @route DELETE /delete/:id
 **/
router.delete("/delete/:id", authorizeTokenAndAdmin, deleteAuthor);

module.exports = router;
