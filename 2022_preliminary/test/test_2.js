const taskList = document.getElementById("testList");
const taskInput = document.getElementById("testInput");

const tasks = JSON.parse(localStorage.getItem("tests")) || [];

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = "";
        updateTaskList();
        saveTasks();
    }
}

function saveTasks() {
    localStorage.setItem("tests", JSON.stringify(tasks));
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
    saveTasks();
}

function updateTaskList() {
    taskList.innerHTML = "";
    tasks.forEach((element, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox" onchange="taggleTask(${index}" ${element.completed ? "checked" : ""}>
            <span>${element.text}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(listItem);
    });
}

function taggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    saveTasks();
}

updateTaskList();