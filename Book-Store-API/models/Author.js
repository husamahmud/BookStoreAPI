const mongoose = require("mongoose");
const Joi = require("joi");

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 50,
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200,
    },
    image: {
        type: String,
        default: "default-avatar.png",
    },
}, {timestamps: true});

// Author Mongoose model
const Author = mongoose.model("Author", authorSchema);

function validateCreateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(200).required(),
        lastName: Joi.string().trim().min(3).max(200).required(),
        nationality: Joi.string().trim().min(2).max(100).required(),
        image: Joi.string(),
    });
    return schema.validate(obj);
}

function validateUpdateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(200),
        lastName: Joi.string().trim().min(3).max(200),
        nationality: Joi.string().trim().min(2).max(100),
        image: Joi.string(),
    });
    return schema.validate(obj);
}

module.exports = {Author, validateCreateAuthor, validateUpdateAuthor};
