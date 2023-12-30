const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    username: {
        type: String, required: true, trim: true, minLength: 3, maxLength: 50,
    }, email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    }, password: {
        type: String, required: true, minLength: 8
    }, isAdmin: {
        type: Boolean, default: false
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

function validateRegisterUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(3).max(50).required(),
        email: Joi.string().email().lowercase().trim().required(),
        password: passwordComplexity().required(),
    });
    return schema.validate(obj);
}

function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().email().lowercase().trim().required(),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(obj);
}

function validateChangePassword(obj) {
    const schema = Joi.object({
        email: Joi.string().email().lowercase().trim().required(),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(obj);
}

function validateUpdateUser(obj) {
    const schema = Joi.object({
        password: Joi.string().min(8),
    });
    return schema.validate(obj);
}

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
    validateChangePassword
};
