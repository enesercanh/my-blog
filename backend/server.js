require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Define a Schema and Model
const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
});
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// Routes
app.post("/register", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }

    try {
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(201).json({ message: "Thank you for signing up!" });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Email is already registered." });
        } else {
            res.status(500).json({ message: "An error occurred. Please try again later." });
        }
    }
});

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
