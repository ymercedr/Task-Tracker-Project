import fs from "fs";
import express from "express";
//allows you to access req.body from within routes and use that data
import bodyParser from "body-parser";

const port = 5300;
const app = express();

//what template engine is used
app.set("view engine", "ejs");
//views folder: the directory where the template files are located

//to serve static files such as images, CSS files, and JavaScript files
//call the express.static middleware function
//used so that it reads the style.css file
app.use(express.static("public"));

//transforms the text-based JSON input into JS-accessible for URL-encoded requests
//extended: true precises that the req.body object will contain values of any type instead of just strings.
//this allows the new task inouts to be read and displayed later on
app.use(bodyParser.urlencoded({ extended: true }));

//reading and parsing JSON file in order to be displayed
const taskJSON = fs.readFileSync("tasks.json");
const task = JSON.parse(taskJSON);
// console.log(task);

//in order to add i'ds to tasks to be able to edit/remove the corrent one later
var taskID = task.length;

//render the ejs and display task from JSON
app.get("/", function (req, res) {
  res.render("index", { task: task });
  res.end();
});

//post route for adding new tasks to JSON
app.post("/addtask", function (req, res) {
  //selecting the input
  let newTask = req.body.newtask;

  //validation: if no task in entered it will take you to /addtask and display the error message
  if (!newTask) {
    return res.status(404).send("Please enter a task.");
  }

  //adding an id to the new task
  taskID++;

  //add the new task (input) from the post route into the JSON array
  task.push({ task: newTask, id: taskID });

  //stringify content for JSON file
  const stringifiedTask = JSON.stringify(task);

  // sending the new tasks to the JSON file
  fs.writeFileSync("tasks.json", stringifiedTask, (err) => {
    if (err) throw err;
  });
  //after adding to the JSON go back to the root route
  res.redirect("/");
});

//post route for removing tasks from JSON
app.post("/removetask/:id", function (req, res) {
  //selecting the right index of the task that will be deleted
  const deleteTask = task.indexOf(
    task.find((c) => c.id === parseInt(req.params.id))
  );
  // console.log(deleteTask);

  if (deleteTask == undefined)
    return res.status(404).send("The task with the given ID was not found.");
  // res.send(deleteTask.id);

  //removing ONE task from display
  task.splice(deleteTask, 1);

  //stringifying the displayed tasks
  const finalStringifiedTask = JSON.stringify(task);

  //updating the JSON file with which taks are still available
  fs.writeFileSync("tasks.json", finalStringifiedTask, (err) => {
    if (err) throw err;
  });
  //after updating the JSON go back to the root route
  res.redirect("/");
});

//post route for updating/rewriting tasks from JSON
app.post("/edittask/:id", function (req, res) {
  //selecting the right index of the task that will be "edited"
  const editTask = task.indexOf(
    task.find((c) => c.id === parseInt(req.params.id))
  );
  // console.log(editTask);

  if (editTask == undefined)
    return res.status(404).send("The task with the given ID was not found.");

  //selecting the new input for the task by using it's index in the array
  let editedTask = req.body.check[editTask];
  // console.log(editedTask);
  //add edited task to as a new task
  task.push({ task: editedTask, id: taskID++ });

  //delete old task
  task.splice(editTask, 1);
  //after adding to the array go back to the root route
  const stringifiedTask = JSON.stringify(task);

  //sending updates to the tasks to JSON
  fs.writeFileSync("tasks.json", stringifiedTask, (err) => {
    if (err) throw err;
    console.log("new task added to JSON file");
  });
  //after updating the JSON go back to the root route
  res.redirect("/");
});

app.listen(port, (err) => {
  //Here we are telling our server to be hosted on port 4000 in our local host
  if (err) return err;
  console.log(`Listening on port ${port}`); //Here we are in port 4000
});
