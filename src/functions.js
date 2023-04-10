import {
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
  taskEditFunction,
  editTask,
  editTaskInput,
  editTaskDescription,
  editTaskPriority,
  editTaskDueDate,
  deleteCompleted,
} from "./ui.js";

const listContainer = projectList;
const newListForm = newProject;
const newListInput = newProjectInput;
const deleteListButton = deleteList;
const listDisplayContainer = taskContainer;
const listTitleElement = taskContainerTitle;
const listCountElement = taskCounter;
const tasksContainer = taskList;
const createNewTask = newTaskButton;
const newTaskForm = newTask;
const newTaskNameInput = newTaskInput;
const newTaskDescriptionInput = newTaskDescription;
const newTaskPriorityInput = newTaskPriority;
const newTaskDateInput = newTaskDueDate;
const clearCompletedTasksButton = deleteCompleted;

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [
  {
    id: "home",
    name: "Home",
    tasks: [],
  },
];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

tasksContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(
      (task) => task.id === e.target.id
    );
    selectedTask.complete = e.target.checked;
    save();
    renderTaskCount(selectedList);
  }
});

clearCompletedTasksButton.addEventListener("click", (e) => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
  saveAndRender();
});

deleteListButton.addEventListener("click", (e) => {
  if (selectedListId === "home") return;
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = "home";
  saveAndRender();
});

newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let listName = newListInput.value;
  if (listName == null || listName === "") return;
  let list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

createNewTask.addEventListener("click", () => {
  newTaskForm.style.display = "grid";
});

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  newTaskForm.style.display = "none";
  let taskName = newTaskNameInput.value;
  let taskDescription = newTaskDescriptionInput.value;
  let taskDate = newTaskDateInput.value;
  let taskPriority = newTaskPriorityInput.value;
  if (taskName == null || taskName === "") return;
  if (taskDate == null || taskDate === "") {
    alert("Please select a due date");
    return;
  }
  let task = createTask(taskName, taskDescription, taskDate, taskPriority);
  newTaskNameInput.value = null;
  newTaskDateInput.value = null;
  newTaskDescriptionInput.value = null;
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
});

function createList(listName) {
  // console.log(listName);
  return {
    id: Date.now().toString(),
    name: listName,
    tasks: [],
  };
}

function createTask(taskName, taskDescription, taskDate, taskPriority) {
  return {
    id: Date.now().toString(),
    name: taskName,
    description: taskDescription,
    date: taskDate,
    priority: taskPriority,
    complete: false,
  };
}

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}
function render() {
  clearElement(listContainer);
  renderLists();

  const selectedList = lists.find((list) => list.id === selectedListId);
  if (selectedListId === null) {
    let selectedList = lists.find((list) => list.id === "home");
    selectedListId = "home";
    listDisplayContainer.style.display = "";
    listTitleElement.textContent = selectedList.name;
    renderTaskCount(selectedList);
    clearElement(tasksContainer);
    renderTasks(selectedList);
  } else {
    listDisplayContainer.style.display = "";
    listTitleElement.textContent = selectedList.name;
    renderTaskCount(selectedList);
    clearElement(tasksContainer);
    renderTasks(selectedList);
  }
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach((task) => {
    let taskElement = document.createElement("div");
    taskElement.classList.add("task");
    let taskCheckbox = document.createElement("input");
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.setAttribute("id", `${task.id}`);
    taskCheckbox.checked = task.complete;
    let taskCheckboxLabel = document.createElement("label");
    taskCheckboxLabel.classList.add("taskLabel");
    taskCheckboxLabel.setAttribute("for", `${task.id}`);
    let taskPriorityDiv = document.createElement("div");
    taskPriorityDiv.classList.add("taskPriority", `${task.priority}`);
    let taskLabelText = document.createElement("div");
    taskLabelText.classList.add("taskTitle");
    taskLabelText.textContent = `${task.name}`;
    let taskCheckboxSpan = document.createElement("span");
    taskCheckboxSpan.classList.add("customCheckbox");
    let taskElementDescription = document.createElement("div");
    taskElementDescription.classList.add("taskDescription");
    taskElementDescription.textContent = `${task.description}`;
    let taskElementPriority = document.createElement("div");
    taskElementPriority.textContent = `Priority: ${task.priority}`;
    let taskElementDate = document.createElement("div");
    taskElementDate.textContent = `${task.date}`;
    let taskEditBtn = document.createElement("button");
    taskEditBtn.classList.add("taskEdit");
    taskEditBtn.textContent = "Edit";
    let taskDeleteBtn = document.createElement("button");
    taskDeleteBtn.classList.add("taskDelete");
    taskDeleteBtn.textContent = "Delete";

    taskEditBtn.addEventListener("click", () => {
      editTask.style.display = "grid";
      taskEdit(task.id);
    });
    taskDeleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    taskCheckboxLabel.append(
      taskPriorityDiv,
      taskCheckboxSpan,
      taskLabelText,
      taskElementDescription,
      taskElementPriority,
      taskElementDate,
      taskEditBtn,
      taskDeleteBtn
    );
    taskElement.append(taskCheckbox, taskCheckboxLabel);
    taskList.appendChild(taskElement);
  });
}

function taskEdit(selectedTask) {
  const selectedList = lists.find((list) => list.id === selectedListId);
  let task = selectedList.tasks.find((task) => task.id === selectedTask);
  console.log(task);
  taskEditFunction(task.name, task.description, task.priority, task.date);

  selectedList.tasks = selectedList.tasks.filter(
    (task) => task.id !== selectedTask
  );
}

editTask.addEventListener("submit", (e) => {
  e.preventDefault();
  editTask.style.display = "none";
  let editedName = editTaskInput.value;
  let editedDescription = editTaskDescription.value;
  let editedPriority = editTaskPriority.value;
  let editedDate = editTaskDueDate.value;

  let task = createTask(
    editedName,
    editedDescription,
    editedDate,
    editedPriority
  );

  let selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
});

function deleteTask(selectedTask) {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter(
    (task) => task.id !== selectedTask
  );
  saveAndRender();
}

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(
    (task) => !task.complete
  ).length;
  let taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  listCountElement.textContent = `${incompleteTaskCount} ${taskString} remaining`;
}

function renderLists() {
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("project");
    listElement.textContent = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add("activeProject");
    }
    listContainer.appendChild(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export { render };
