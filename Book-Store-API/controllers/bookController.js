const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
    Book,
    validateAddBook,
    validateUpdateBook
} = require("../models/Book");

router.use(express.json());

const getAllBooks = asyncHandler(async (req, res) => {
    const {minPrice, maxPrice} = req.query;
    const query = {};

    if (minPrice !== undefined && !isNaN(minPrice))
        query.price = {...query.price, $gte: Number(minPrice)};

    if (maxPrice !== undefined && !isNaN(maxPrice))
        query.price = {...query.price, $lt: Number(maxPrice)};

    const booksList = await Book.find(query).populate("author", ["_id", "name", "email"]);
    res.status(200).json(booksList);
});

const getBookByID = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) res.status(200).json(book);
    else res.status(404).json({error: "Book not found"});
});

const createBook = asyncHandler(async (req, res) => {
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
});

const updateBook = asyncHandler(async (req, res) => {
    const {error} = validateUpdateBook(req.body);
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
});

const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Book has been deleted"});
    } else {
        res.status(404).json({error: "Author not found"});
    }
});

module.exports = {
    getAllBooks,
    getBookByID,
    createBook,
    updateBook,
    deleteBook
};
