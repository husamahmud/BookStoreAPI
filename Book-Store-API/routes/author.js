const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

router.use(express.json());

const {
    Author,
    validateCreateAuthor,
    validateUpdateAuthor
} = require("../models/Author");


/**
 * Get all authors
 * @route GET /
 **/
router.get("/", asyncHandler(async (req, res) => {
    const authorsList = await Author.find();
    res.status(200).json(authorsList);
}));

/**
 * Get a specific author by ID
 * @route GET /:id
 **/
router.get("/:id", asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) res.status(200).json(author);
    else res.status(404).json({error: "Author not found"});
}));

/**
 * Create a new author
 * @route POST /add
 **/
router.post("/add", asyncHandler(async (req, res) => {
    const {error} = validateCreateAuthor(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    const author = new Author({
        name: req.body.name,
        email: req.body.email,
        books: req.body.books,
        address: req.body.address,
    });
    const newAuthor = await author.save();

    res.status(201).json({
        message: "Author addedd successfully",
        data: newAuthor
    });
}));

/**
 * Update an existing author
 * @route PUT /update/:id
 **/
router.put("/update/:id", asyncHandler(async (req, res) => {
    const {error} = validateUpdateAuthor(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({error: "Author not found"});

    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            books: req.body.books,
            address: req.body.address
        }
    }, {new: true});

    res.status(200).json({
        message: "Author updated successfully",
        data: updatedAuthor
    });
}));

/**
 * Delete an author by ID
 * @route Delete /delete/:id
 **/
router.delete("/delete/:id", asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Author has been deleted"});
    } else {
        res.status(404).json({error: "Author not found"});
    }
}));

module.exports = router;
