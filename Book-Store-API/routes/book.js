const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

router.use(express.json());

const {
    Book, validateAddBook, validateUpdateBook
} = require("../models/Book");
const {Author} = require("../models/Author");

/**
 * Get all authors
 * @route Get /
 **/
router.get("/", asyncHandler(async (req, res) => {
    const booksList = await Book.find();
    res.status(200).json(booksList);
}));

/**
 * Get a specific book by ID
 * @route GET /:id
 **/
router.get("/:id", asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) res.status(200).json(book);
    else res.status(404).json({error: "Book not found"});
}));

/**
 * Create a new book
 * @route POST /add
 **/
router.post("/add", asyncHandler(async (req, res) => {
    const {error} = validateAddBook(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publication_date: req.body.publication_date,
        description: req.body.description,
        section: req.body.section,
        cover: req.body.cover
    });
    const newBook = await book.save();

    res.status(201).json({
        message: "Book added successfully",
        data: newBook,
    });
}));

/**
 * Update an existing book
 * @route PUT /update/:id
 **/
router.put("/update/:id", asyncHandler(async (req, res) => {
    const {error} = validateUpdateBook(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({error: "Book not found"});

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            publication_date: req.body.publication_date,
            description: req.body.description,
            section: req.body.section,
            cover: req.body.cover
        }
    }, {new: true});

    res.status(200).json({
        message: "Book updated successfully",
        data: updatedBook
    });
}));

/**
 * Delete a book by ID
 * @route Delete /delete/:id
 **/
router.delete("/delete/:id", asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Book has been deleted"});
    } else {
        res.status(404).json({error: "Author not found"});
    }
}));

module.exports = router;
