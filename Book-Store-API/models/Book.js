const mongoose = require("mongoose");
const Joi = require("joi");

const bookSchema = new mongoose.Schema({
    title: {
        type: String, required: true, trim: true, minLength: 3, maxLength: 50,
    }, author: {
        type: mongoose.Schema.ObjectId, required: true, ref: "Author",
    }, publication_date: {
        type: Date, trim: true
    }, description: {
        type: String, required: true, trim: true
    }, price: {
        type: Number, required: true, min: 0,
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
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(250).required(),
        author: Joi.string().required(),
        description: Joi.string().trim().min(5).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().valid("soft cover", "hard cover").required(),
    });
    return schema.validate(obj);
}

function validateUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(250),
        author: Joi.string(),
        description: Joi.string().trim().min(5),
        price: Joi.number().min(0),
        cover: Joi.string().valid("soft cover", "hard cover"),
    });
    return schema.validate(obj);
}

module.exports = {Book, validateAddBook, validateUpdateBook};
