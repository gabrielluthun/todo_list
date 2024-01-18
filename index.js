let taskList = document.getElementById('taskList');

//Sauvegarder en local storage les tâches
let localStorageTasks = JSON.parse(localStorage.getItem('tasks')) || '[]';


function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value;
    if (taskText === '') {
        return;
    }

    var li = document.createElement('li');
    li.innerHTML = taskText;


    var editButton = document.createElement('button');
    editButton.innerHTML = '<ion-icon name="pencil-outline" class="modify"></ion-icon>';

    editButton.onclick = function () {
        editTask(li);
    }

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<ion-icon name="trash" class="delete"></ion-icon>';

    deleteButton.onclick = function () {
        deleteTask(li);
    }

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = "";

    localStorageTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));

}

function editTask(task) {
    let taskTextElement = task.firstChild;
    let taskText = taskTextElement.textContent;


    let newTaskText = prompt('Modifier la tâche : ', taskText);
    if (newTaskText === null || newTaskText === '') {
        return;
    }

    taskTextElement.textContent = newTaskText;
}

function deleteTask(task) {
    taskList.removeChild(task);
}

function createTaskElement(taskText) {
    var li = document.createElement("li");
    li.innerHTML = taskText;
  
    var editButton = document.createElement("button");
    editButton.innerHTML = '<ion-icon name="pencil-outline" class="modify"></ion-icon>';
    editButton.onclick = function() {
      editTask(li);
      localStorageTasks.splice(localStorageTasks.indexOf(taskText), 1, li.textContent);
      localStorage.setItem('tasks', JSON.stringify(localStorageTasks)); 
    };
  
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<ion-icon name="trash-outline" class="delete"></ion-icon>';
    deleteButton.onclick = function() {
      deleteTask(li);
        localStorageTasks.splice(localStorageTasks.indexOf(taskText), 1);
      localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
    };
  
    li.appendChild(editButton);
    li.appendChild(deleteButton);
  
    return li;
  }

window.onload = function () {
    var localStorageTasks = JSON.parse(localStorage.getItem('tasks')) || "[]";

    for (let i = 0; i < localStorageTasks.length; i++) {
        let li = createTaskElement(localStorageTasks[i]);
        taskList.appendChild(li);


    }
}