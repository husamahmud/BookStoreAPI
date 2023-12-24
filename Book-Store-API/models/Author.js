const mongoose = require("mongoose");
const joi = require("joi");

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 50
    }, email: {
        type: String,
        required: true,
        trim: true
    }, books: {
        type: [Number],
        // ToDo: create book schema
        /* type: [{
             type: mongoose.Schema.ObjectId,
             ref: "Book",
         }],
         required: true,
         validate: {
             validator: function (val) {
                 return val.every((id) => mongoose.Types.ObjectId.isValid(id));
             },
             message: "Invalid book ID"
         }*/
    }, address: {
        type: String
    }
}, {
    timestamps: true
});

const Author = mongoose.model("Author", authorSchema);

function validateCreateAuthor(obj) {
    const schema = joi.object({
        name: joi.string().trim().min(5).max(50).required(),
        email: joi.string().trim().min(5).max(50).required(),
        books: joi.array().min(1).items(joi.number()).required(), // ToDo
        address: joi.string().trim().min(5).max(50)
    });
    return schema.validate(obj);
}

function validateUpdateAuthor(obj) {
    const schema = joi.object({
        name: joi.string().trim().min(5).max(50),
        email: joi.string().trim().min(5).max(50),
        books: joi.array().min(1).items(joi.number()),
        address: joi.string().trim().min(5).max(50)
    });
    return schema.validate(obj);
}

module.exports = {Author, validateCreateAuthor, validateUpdateAuthor};
