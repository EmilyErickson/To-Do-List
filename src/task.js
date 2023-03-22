const myTasks = [];

class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.info = function info() {
      return `${title} ${description} ${dueDate} ${priority}`;
    };
  }
}

function makeNewTask(title, description, dueDate, priority) {
  let addTask = new Task(title, description, dueDate, priority);
  myTasks.push(addTask);
  return myTasks;
}

export { makeNewTask, myTasks };
