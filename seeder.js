const {Book} = require("./models/Book");
const {books} = require("./data");
const connectToDB = require("./config/db");
const mongoose = require("mongoose");
require("dotenv").config();

connectToDB();

const importBooks = async () => {
    try {
        await Book.insertMany(books);
        console.log("Books seeded successfully!");
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
    }
};
const deleteBooks = async () => {
    try {
        await Book.deleteMany();
        console.log("Books deleted successfully!");
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
    }
};

// usage: node seeder -import
if (process.argv[2] === "-import") importBooks();

// usage: node seeder -delete
if (process.argv[2] === "-delete") deleteBooks();
