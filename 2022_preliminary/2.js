// 初始化任務列表
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

// 從本地儲存讀取待辦事項，如果存在的話
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 更新待辦事項列表
function updateTaskList() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox" onchange="toggleTask(${index})" ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})">刪除</button>
        `;
        taskList.appendChild(listItem);
    });
}

// 新增待辦事項
function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = "";
        updateTaskList();
        saveTasks();
    }
}

// 刪除待辦事項
function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
    saveTasks();
}

// 標記已完成/未完成
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    saveTasks();
}

// 將待辦事項儲存到本地儲存
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 初始化時載入待辦事項列表
updateTaskList();