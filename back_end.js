const express = require("express"); // Import express
const mongoose = require("mongoose");
const app = express(); // Set up express.js
app.set('view engine', 'pug');



app.get('/', (req, res) => {
    res.render("layout", )
})

// Connect to mongoose
mongoose.connect("mongodb+srv://seni0028_db_user:MkhSeyBxTy7PNSe8@assignment2.ncyx0hl.mongodb.net")
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
        console.log("An error occured when attempting to connect to the database!");
        console.log(" " + err.message)
    });

// Set up the structure of the data.
const userListSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    title: {type: String, required: true},
    description: String,
    dueDate: Date,
    priority: {type: String, required: true},
    status: {type: Boolean, required: true}
});
const todoListModel = new mongoose.model("todo list", userListSchema);






/* Adds a new user.
 * req must have in its body a field called userName
 */
function getUser(req, res) {
    const userTodoList = todoListModel.find({
        userName: req.body.userName
    });
    res.json({
        todoListOfUser: userTodoList
    });
}

// Add a new list item
// req must have a field in it's body called todo, which is a string containing the todo item.
function addNewListItem(req) {
    const newListItem = todoListModel.create({
        userName: req.body.userName,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priotity: req.body.priotity,
        status: req.body.status
    });
}

/*
 * removes a given list item
 */
function removeListItem(req) {
    const deletedItem = todoListModel.deleteOne(
        {
            userName: req.body.userName,
            title: req.body.title,
            description: req.body.description
        }
    )
}

/*
 * Change or update a lists item
 */
function updateListItem(req) {
    const newListItem = todoListModel.updateOne(
        {
            userName: req.body.userName,
            title: req.body.oldTitle,
            description: req.body.oldDescription
        },
        {
            userName: req.body.userName,
            title: req.body.newTitle,
            description: req.body.newDescription,
            dueDate: req.body.newDueDate,
            priority: req.body.newPriority,
            status: req.body.newStatus
        }
    );
}






app.listen(3000, () => console.log('server up on :3000')); // Set up the server

app.get("/", (req, res) => {
    res.render("layout");
})
app.post("/newUser", getUser);
app.post("/newListItem", addNewListItem);
app.post("/deleteListItem", removeListItem);
app.post("/updateListItem", updateListItem);