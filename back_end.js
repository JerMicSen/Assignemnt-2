const express = require("express"); // Import express
const mongoose = require("mongoose");
const app = express(); // Set up express.js
let data;
let currentUser;





// Connect to mongoose
mongoose.connect("mongodb+srv://seni0028_db_user:MkhSeyBxTy7PNSe8@assignment2.ncyx0hl.mongodb.net")
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
        console.log("An error occured when attempting to connect to the database!");
        console.log(" " + err.message)
    });

// Set up the structure of the data.
const userListSchema = new mongoose.Schema({
    user: {type: String, required: true},
    todoList: [String]
});
const todoListModel = new mongoose.model("todo list", userListSchema);






/* Adds a new user.
 * req must have in its body a field called userName
 */
function getUser(req) {
    // Check if a user of the name already exists
    const user = await todoListModel.findOne({user: req.body.userName});
    if (users != null) {
        currentUser = users;
    } else {
        // Add the user to the database
        currentUser = await todoListModel.create({user: req.body.userName});
    }
}

// Add a new list item
// req must have a field in it's body called todo, which is a string containing the todo item.
function addNewListItem(req) {
    user.todoList.push(req.body.todo);
    const updatedUser = await todoListModel.updateOne({user: currentUser.user}, {todoList: user.todoList});
}

/*
 * removes a given list item
 */
function removeListItem(req) {
    const todoIndex = user.todoList.indexOf(req.body.todo);
    user.todoList.splice(todoIndex, 1);
    const updateUser = await todoListModel.updateOne({user: currentUser.user}, {todoList: usertodoList});
}

/*
 *sends the users data
 */
function getUsersTodoList(req, res) {
    getUser(req);
    res.json({
        todoList: currentUser.todoList
    });
}

/*
 * Change or update a lists item
 */
function updateListItem(req) {
    const listItemIndex = currentUser.todoList.indexOf(req.body.oldTodo);
    currentUser.todoList[listItemIndex] = req.body.newTodo;

    const todoIndex = await todoListModel.updateOne(
        {
            user: currentUser.user,
        },
        {
            todoList: currentUser.todoList
        }
    );
}






app.listen(3000, () => console.log('server up on :3000')); // Set up the server

app.post("/newUser", herUsersTodoList(req, res));
app.post("/newListItem", addNewListItem(req));
app.post("/deleteListItem", removeListItem(req));
app.post("/updateListItem", updateListItem(req));