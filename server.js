import fs from "fs";
import express from "express";
import bodyParser from "body-parser";

const port = 5300;
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const taskJSON = fs.readFileSync("tasks.json");
const task = JSON.parse(taskJSON);
// console.log(task);

var taskID = task.length;

//render the ejs and display added task, task(index.ejs) = task(array)
app.get("/", function (req, res) {
  res.render("index", { task: task });
  res.end();
});

//post route for adding new task
app.post("/addtask", function (req, res) {
  let newTask = req.body.newtask;

  if (!newTask) {
    return res.status(404).send("Please enter a task.");
  }

  taskID++;

  //add the new task from the post route into the array
  task.push({ task: newTask, id: taskID });
  //after adding to the array go back to the root route
  const stringifiedTask = JSON.stringify(task);

  // SENDING DATA BACK TO JSON FILE
  fs.writeFileSync("tasks.json", stringifiedTask, (err) => {
    if (err) throw err;
    console.log("new task added to JSON file");
  });
  res.redirect("/");
});

app.post("/removetask/:id", function (req, res) {
  const deleteTask = task.indexOf(
    task.find((c) => c.id === parseInt(req.params.id))
  );
  // console.log(deleteTask);
  if (deleteTask == undefined)
    return res.status(404).send("The task with the given ID was not found.");
  // res.send(deleteTask.id);
  task.splice(deleteTask, 1);

  const finalStringifiedTask = JSON.stringify(task);

  fs.writeFileSync("tasks.json", finalStringifiedTask, (err) => {
    if (err) throw err;
    console.log("new task added to JSON file");
  });
  res.redirect("/");
});

app.post("/edittask/:id", function (req, res) {
  // //same definition as deleteTask
  const editTask = task.indexOf(
    task.find((c) => c.id === parseInt(req.params.id))
  );
  // console.log(editTask);
  if (editTask == undefined)
    return res.status(404).send("The task with the given ID was not found.");

  //add edited task
  let editedTask = req.body.check[editTask];
  // console.log(editedTask);
  task.push({ task: editedTask, id: taskID++ });
  //delete old task
  task.splice(editTask, 1);
  //after adding to the array go back to the root route
  const stringifiedTask = JSON.stringify(task);

  // SENDING DATA BACK TO JSON FILE
  fs.writeFileSync("tasks.json", stringifiedTask, (err) => {
    if (err) throw err;
    console.log("new task added to JSON file");
  });
  res.redirect("/");
});

app.listen(port, (err) => {
  //Here we are telling our server to be hosted on port 4000 in our local host
  if (err) return err;
  console.log(`Listening on port ${port}`); //Here we are in port 4000
});
