const mongoose = require("mongoose");
const joi = require("joi");

const bookSchema = new mongoose.Schema({
    title: {
        type: String, required: true, trim: true, minLength: 3, maxLength: 50,
    }, author: {
        type: mongoose.Schema.ObjectId, required: true, ref: "Author",
    }, publication_date: {
        type: Date, trim: true
    }, description: {
        type: String, required: true, trim: true
    }, section: {
        type: String, required: true,
    }, cover: {
        type: String,
        trim: true,
        required: true,
        enum: ["soft cover", "hard cover"]
    }
}, {
    timestamps: true
});

const Book = mongoose.model("Book", bookSchema);

function validateAddBook(obj) {
    const schema = joi.object({
        title: joi.string().trim().min(5).max(50).required(),
        author: joi.string().trim().required(),
        publication_date: joi.string().trim(),
        description: joi.string().trim().required(),
        section: joi.string().trim().required(),
        cover: joi.string().valid("soft cover", "hard cover").required()
    });
    return schema.validate(obj);
}

function validateUpdateBook(obj) {
    const schema = joi.object({
        title: joi.string().trim(),
        author: joi.string().trim(),
        publication_date: joi.string().trim(),
        description: joi.string().trim(),
        section: joi.string().trim(),
        cover: joi.string().valid("soft cover", "hard cover"),
    });
    return schema.validate(obj);
}

module.exports = {Book, validateAddBook, validateUpdateBook};
