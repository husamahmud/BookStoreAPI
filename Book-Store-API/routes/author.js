const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {authorizeTokenAndAdmin} = require("../middlewares/verifyToken");

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
router.post("/add", authorizeTokenAndAdmin, asyncHandler(async (req, res) => {
    const {error} = validateCreateAuthor(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image
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
router.put("/update/:id", authorizeTokenAndAdmin, asyncHandler(async (req, res) => {
    const {error} = validateUpdateAuthor(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({error: "Author not found"});

    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
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
router.delete("/delete/:id", authorizeTokenAndAdmin, asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Author has been deleted"});
    } else {
        res.status(404).json({error: "Author not found"});
    }
}));

module.exports = router;
