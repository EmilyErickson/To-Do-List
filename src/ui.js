import "./style.css";
import { makeNewTask } from "./task.js";
import { myTasks } from "./task.js";

const content = document.querySelector("#content");
let container = document.createElement("div");
container.classList.add("taskContainer");

function renderInitailPage() {
  let title = document.createElement("div");
  title.classList.add("mainTitle");
  title.textContent = "To-Do List";

  let projects = document.createElement("div");
  projects.classList.add("projectsDiv");

  content.append(title, projects);
}

//Adds the crete task button to the initial page render.
function addTasktoUI() {
  let newTaskButton = document.createElement("button");
  newTaskButton.classList.add("taskButton");
  newTaskButton.textContent = "+";

  newTaskButton.addEventListener("click", getTaskInfo);
  content.append(newTaskButton);
}

function taskContainer(task) {
  container.append(task);

  content.append(container);
}

//Create input from and get the information that is input by user
function getTaskInfo() {
  let taskInput = document.createElement("div");
  taskInput.classList.add("taskInfoForm");
  let title = document.createElement("input");

  let dueDate = document.createElement("input");
  let description = document.createElement("input");
  let priority = document.createElement("input");

  let saveTask = document.createElement("button");
  saveTask.textContent = "Save Task";

  let getTitle = () => title.value.toString();
  let getDescription = () => description.value.toString();
  let getDate = () => dueDate.value.toString();
  let getPriority = () => priority.value.toString();

  taskInput.append(title, description, dueDate, priority, saveTask);

  saveTask.addEventListener("click", () => {
    taskInput.classList.add("hidden");
    makeNewTask(getTitle(), getDescription(), getDate(), getPriority());
    newTaskToUI(getTitle(), getDescription(), getDate(), getPriority());
    console.log({ myTasks });
  });

  content.append(taskInput);
}

//Creates the UI task with the info on it
function newTaskToUI(title, description, date, priority) {
  let task = document.createElement("div");
  task.classList.add("task");
  let taskTitle = document.createElement("div");
  let taskDate = document.createElement("div");
  let taskPriority = document.createElement("div");
  let taskDescription = document.createElement("div");

  taskTitle.textContent = `Title: ${title}`;
  taskDescription.textContent = `Description: ${description}`;
  taskDate.textContent = `Due Date: ${date}`;
  taskPriority.textContent = `Priority: ${priority}`;

  task.append(taskTitle, taskDescription, taskDate, taskPriority);

  taskContainer(task);
}

// function newTaskToArray(title, date) {
//   console.log(myTasks);
//   console.log(makeNewTask(title, date));
//   //   makeNewTask(title, date);
// }

export default renderInitailPage;
export { addTasktoUI };
