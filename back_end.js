require("dotenv").config({ path: "atlas-credentials.env" });
const express = require("express"); // Import express
const mongoose = require("mongoose");
const app = express(); // Set up express.js
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



// Connect to mongoose
mongoose.connect(process.env.MONGODB_URI)
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
async function getUser(req, res) {
    const userTodoList = await todoListModel.find({
        userName: req.body.userName
    });

    res.render("index", {
        todoListOfUser: userTodoList
    });
}

// Add a new list item
// req must have a field in it's body called todo, which is a string containing the todo item.
async function addNewListItem(req, res) {
    await todoListModel.create({
        userName: req.body.userName,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status
    });

    const userTodoList = await todoListModel.find({
        userName: req.body.userName
    });

    res.render("index", {
        todoListOfUser: userTodoList
    });
}

/*
 * removes a given list item
 */
async function removeListItem(req, res) {
    await todoListModel.deleteOne({
        userName: req.body.userName,
        title: req.body.title,
        description: req.body.description
    });

    const userTodoList = await todoListModel.find({
        userName: req.body.userName
    });

    res.render("index", {
        todoListOfUser: userTodoList
    });
}

/*
 * Change or update a lists item
 */
async function updateListItem(req, res) {
    await todoListModel.updateOne(
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

    const userTodoList = await todoListModel.find({
        userName: req.body.userName
    });

    res.render("index", {
        todoListOfUser: userTodoList
    });
}






app.listen(3000, () => console.log('server up on :3000')); // Set up the server

app.get("/", (req, res) => {
    res.render("index", {
        todoListOfUser: []
    });
});
app.get("/tasks/add", (req, res) => {
    res.render("add");
});
app.get("/tasks/details/:id", async (req, res) => {
    const task = await todoListModel.findById(req.params.id);

    res.render("details", {
        task: task
    });
});
app.get("/tasks/edit/:id", async (req, res) => {
    const task = await todoListModel.findById(req.params.id);

    res.render("edit", {
        task: task
    });
});
app.post("/newUser", getUser);
app.post("/newListItem", addNewListItem);
app.post("/deleteListItem", removeListItem);
app.post("/updateListItem", updateListItem);