const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const taskForm = document.getElementById('taskForm');
const allFilter = document.getElementById('allFilter');
const completedFilter = document.getElementById('completedFilter');
const uncompletedFilter = document.getElementById('uncompletedFilter');

// Initialize task counter
let counter = 0;


function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {

        const listItem = document.createElement('li');
        listItem.classList.add('task-container', 'fade-in');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = taskText;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';


        checkbox.addEventListener('change', toggleTask);
        deleteButton.addEventListener('click', deleteTask);


        listItem.appendChild(checkbox);
        listItem.appendChild(taskTextElement);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);


        taskInput.value = '';


        counter++;
        taskCount.textContent = counter;
    }
}

function deleteSelectedTasks() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const tasksToDelete = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const listItem = checkbox.parentElement;
            tasksToDelete.push(listItem.querySelector('span').textContent);
            listItem.classList.add('fade-out'); // Add 'fade-out' class for animation
        }
    });

    if (tasksToDelete.length > 0) {
        const deleteConfirmation = confirm(`Deleting ${tasksToDelete.length} task(s):\n${tasksToDelete.join('\n')}`);
        if (deleteConfirmation) {
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const listItem = checkbox.parentElement;
                    setTimeout(() => {
                        taskList.removeChild(listItem);
                        counter--;
                        taskCount.textContent = counter;
                    }, 500); // Delay the removal to match the animation duration (0.5s)
                }
            });
        }
    } else {
        alert("No tasks selected for deletion.");
    }
}



function toggleTask(event) {
    const listItem = event.target.parentElement;
    if (event.target.checked) {
        listItem.classList.add('completed');
    } else {
        listItem.classList.remove('completed');
    }
}


function deleteTask(event) {
    const listItem = event.target.parentElement;
    const taskText = listItem.querySelector('span').textContent;

    const deleteConfirmation = confirm(`Deleting 1 task:\n${taskText}`);
    if (deleteConfirmation) {
        listItem.classList.add('fade-out');
        setTimeout(() => {
            taskList.removeChild(listItem);
            counter--;
            taskCount.textContent = counter;
        }, 500); // Delay animation duration (0.5s)
    }
}

function updateTaskVisibility(filter) {

    allFilter.classList.remove('selected');
    completedFilter.classList.remove('selected');
    uncompletedFilter.classList.remove('selected');


    switch (filter) {
        case 'completed':
            completedFilter.classList.add('selected');
            break;
        case 'uncompleted':
            uncompletedFilter.classList.add('selected');
            break;
        default:
            allFilter.classList.add('selected');
    }

    const taskItems = document.querySelectorAll('#taskList li');

    taskItems.forEach(taskItem => {
        switch (filter) {
            case 'completed':
                if (taskItem.classList.contains('completed')) {
                    taskItem.style.display = 'flex';
                } else {
                    taskItem.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!taskItem.classList.contains('completed')) {
                    taskItem.style.display = 'flex';
                } else {
                    taskItem.style.display = 'none';
                }
                break;
            default:
                taskItem.style.display = 'flex';
        }
    });
}

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();


    addTask();
});

allFilter.addEventListener('click', () => updateTaskVisibility('all'));
completedFilter.addEventListener('click', () => updateTaskVisibility('completed'));
uncompletedFilter.addEventListener('click', () => updateTaskVisibility('uncompleted'));

updateTaskVisibility('all');


const deleteSelectedButton = document.getElementById('deleteSelected');
deleteSelectedButton.addEventListener('click', deleteSelectedTasks);
addTaskButton.addEventListener('click', addTask);