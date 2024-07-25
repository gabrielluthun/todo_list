let taskList = document.getElementById('taskList');

// Sauvegarder en local storage les tâches
let Tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(Tasks));
}

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value;
    if (taskText === '') {
        return;
    }

    let li = createTaskElement(taskText);
    taskList.appendChild(li);

    taskInput.value = "";

    Tasks.push(taskText);
    saveTasks();
}

function editTask(task) {
    let taskTextElement = task.firstChild;
    let taskText = taskTextElement.textContent;

    let newTaskText = prompt('Modifier la tâche : ', taskText);
    if (newTaskText === null || newTaskText === '') {
        return;
    }

    taskTextElement.textContent = newTaskText;

    let index = Tasks.indexOf(taskText);
    if (index !== -1) {
        Tasks[index] = newTaskText;
        saveTasks();
    }
}

function deleteTask(task) {
    let taskText = task.firstChild.textContent;
    let index = Tasks.indexOf(taskText);
    if (index !== -1) {
        Tasks.splice(index, 1);
        saveTasks();
    }
    taskList.removeChild(task);
}

function createTaskElement(taskText) {
    let li = document.createElement("li");
    li.innerHTML = taskText;

    let editButton = document.createElement("button");
    editButton.innerHTML = '<ion-icon name="pencil-outline" class="modify"></ion-icon>';
    editButton.onclick = function() {
        editTask(li);
    };

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<ion-icon name="trash-outline" class="delete"></ion-icon>';
    deleteButton.onclick = function() {
        deleteTask(li);
    };

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    return li;
}

function loadTasks() {
    Tasks.forEach(taskText => {
        let li = createTaskElement(taskText);
        taskList.appendChild(li);
    });
}

// Charger les tâches au démarrage
loadTasks();