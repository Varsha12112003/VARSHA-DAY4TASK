
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
document.addEventListener("DOMContentLoaded", loadTasks);


addTaskBtn.addEventListener("click", addTask);


function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task.");

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  saveTask(task);
  renderTask(task);
  taskInput.value = "";
}
function renderTask(task) {
  const li = document.createElement("li");
  li.className = "task-item";
  li.setAttribute("data-id", task.id);

  if (task.completed) li.classList.add("completed");

  li.innerHTML = `
    <input type="checkbox" ${task.completed ? "checked" : ""}>
    <span class="task-text">${task.text}</span>
    <button class="delete-btn">Delete</button>
  `;


  li.querySelector("input").addEventListener("change", (e) => {
    toggleTask(task.id, e.target.checked);
  });
  li.querySelector(".delete-btn").addEventListener("click", () => {
    deleteTask(task.id, li);
  });

  taskList.appendChild(li);
}

function toggleTask(id, completed) {
  const tasks = getTasks();
  const task = tasks.find((task) => task.id === id);
  task.completed = completed;
  saveTasks(tasks);
  const taskItem = document.querySelector(`.task-item[data-id='${id}']`);
  taskItem.classList.toggle("completed");
}
function deleteTask(id, taskElement) {
  const tasks = getTasks().filter((task) => task.id !== id);
  saveTasks(tasks);
  taskElement.remove();
}
function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(renderTask);
}
