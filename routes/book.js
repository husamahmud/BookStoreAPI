const express = require("express");
const router = express.Router();
const {authorizeTokenAndAdmin} = require("../middlewares/verifyToken");

router.use(express.json());

const {
    getAllBooks, getBookByID, createBook, updateBook, deleteBook
} = require("../controllers/bookController");

/**
 * Get all authors
 * @route Get /
 **/
router.get("/", getAllBooks);

/**
 * Get a specific book by ID
 * @route GET /:id
 **/
router.get("/:id", getBookByID);

/**
 * Create a new book
 * @route POST /add
 **/
router.post("/add", authorizeTokenAndAdmin, createBook);

/**
 * Update an existing book
 * @route PUT /update/:id
 **/
router.put("/update/:id", updateBook);

/**
 * Delete a book by ID
 * @route Delete /delete/:id
 **/
router.delete("/delete/:id", authorizeTokenAndAdmin, deleteBook);

module.exports = router;
