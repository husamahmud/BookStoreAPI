const mongoose = require("mongoose");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB database");

        mongoose.connection.on("error", (error) => {
            console.error("MongoDB connection error:", error);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = connectToDB;
