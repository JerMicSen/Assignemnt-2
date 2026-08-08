const express = require("express"); // Import express
const mongoose = require("mongoose");
const app = express(); // Set up express.js

app.listen(3000, () => console.log('server up on :3000')); // Set up the server

mongoose.connect("mongodb+srv://seni0028_db_user:MkhSeyBxTy7PNSe8@assignment2.ncyx0hl.mongodb.net")
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
        console.log("An error occured when attempting to connect to the database!");
        console.log(" " + err.message)
    })