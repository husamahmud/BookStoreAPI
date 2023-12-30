const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
    Author,
    validateCreateAuthor,
    validateUpdateAuthor
} = require("../models/Author");

router.use(express.json());

const getAllAuthors = asyncHandler(async (req, res) => {
    const authorsList = await Author.find();
    res.status(200).json(authorsList);
});

const getAuthorByID = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) res.status(200).json(author);
    else res.status(404).json({error: "Author not found"});
});

const createAuthor = asyncHandler(async (req, res) => {
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
});

const updateAuthor = asyncHandler(async (req, res) => {
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
});

const deleteAuthor = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Author has been deleted"});
    } else {
        res.status(404).json({error: "Author not found"});
    }
});

module.exports = {
    getAllAuthors,
    getAuthorByID,
    createAuthor,
    updateAuthor,
    deleteAuthor
};
