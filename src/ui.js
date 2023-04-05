import "./style.css";

const content = document.querySelector("#content");
let title = document.createElement("h1");
title.classList.add("mainTitle");
title.textContent = "To-Do List";
content.appendChild(title);

//project container

let projectContainer = document.createElement("div");
projectContainer.classList.add("projectContainer");
let projectContainerTitle = document.createElement("h2");
projectContainerTitle.classList.add("projectContainerTitle");
projectContainerTitle.textContent = "My lists";

let projectList = document.createElement("ul");
projectList.classList.add("projectList");
projectList.dataset["data-lists"];

let newProject = document.createElement("form");
let newProjectInput = document.createElement("input");
newProjectInput.setAttribute("placeholder", "new list name");
newProjectInput.classList.add("new", "list");
newProjectInput.ariaLabel = "new list name";

let newProjectButton = document.createElement("button");
newProjectButton.classList.add("btn", "create");
newProjectButton.textContent = "+";
newProjectButton.ariaLabel = "create new list";

newProject.append(newProjectButton, newProjectInput);
projectContainer.append(projectContainerTitle, projectList, newProject);
content.appendChild(projectContainer);

//task container//

let taskContainer = document.createElement("div");
taskContainer.classList.add("taskContainer");

let taskContainerHeader = document.createElement("div");
taskContainerHeader.classList.add("taskContainerHeader");
let taskContainerTitle = document.createElement("h2");
taskContainerTitle.classList.add("taskListTitle");
let taskCounter = document.createElement("div");
taskCounter.classList.add("taskCount");

taskContainerHeader.append(taskContainerTitle, taskCounter);
taskContainer.append(taskContainerHeader);

let taskListBody = document.createElement("div");
taskListBody.classList.add("taskListBody");
let taskList = document.createElement("div");
taskList.classList.add("taskList");

taskListBody.append(taskList);
taskContainer.append(taskListBody);

//new task creator

let newTask = document.createElement("form");
newTask.classList.add("newTask");
let newTaskInput = document.createElement("input");
newTaskInput.setAttribute("placeholder", "new task name");
newTaskInput.classList.add("new", "task");
newTaskInput.ariaLabel = "new task name";

let newTaskDescription = document.createElement("input");
newTaskDescription.classList.add("new", "task", "description");
newTaskDescription.setAttribute("placeholder", "description");

let values = ["High", "Medium", "Low"];
let newTaskPriority = document.createElement("select");
newTaskPriority.name = "priorities";
newTaskPriority.classList.add("taskFormText", "priority");
for (let val of values) {
  let option = document.createElement("option");
  option.value = val;
  option.textContent = val.charAt(0).toUpperCase() + val.slice(1);
  newTaskPriority.appendChild(option);
}
let newTaskDueDate = document.createElement("input");
newTaskDueDate.setAttribute("type", "date");
newTaskDueDate.classList.add("new", "task", "date");

let newTaskSave = document.createElement("button");
newTaskSave.textContent = "Save Task";
newTaskSave.classList.add("new", "task", "createTask");

let newTaskButton = document.createElement("button");
newTaskButton.classList.add("btn", "create", "createTask");
newTaskButton.textContent = "Create New Task";
newTaskButton.ariaLabel = "create new task";

newTask.append(
  newTaskInput,
  newTaskDescription,
  newTaskPriority,
  newTaskDueDate,
  newTaskSave
);
taskContainer.append(newTaskButton, newTask);

//delete buttons

let deleteDiv = document.createElement("div");
deleteDiv.classList.add("deleteStuff");
let deleteCompleted = document.createElement("button");
deleteCompleted.classList.add("btn", "delete");
deleteCompleted.textContent = "Clear completed tasks";
let deleteList = document.createElement("button");
deleteList.classList.add("btn", "delete");
deleteList.textContent = "Delete List";

deleteDiv.append(deleteCompleted, deleteList);
taskContainer.append(deleteDiv);

content.appendChild(taskContainer);

export {
  projectList,
  newProject,
  newProjectInput,
  deleteList,
  taskContainer,
  taskContainerTitle,
  taskCounter,
  taskList,
  newTask,
  newTaskButton,
  newTaskInput,
  newTaskDescription,
  newTaskPriority,
  newTaskDueDate,
  deleteCompleted,
};
