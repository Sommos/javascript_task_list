// define ui variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add tasks event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear task event
  clearBtn.addEventListener('click', clearTasks);
  // filter task events
  filter.addEventListener('keyup', filterTasks);
}

// get tasks from local storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
      // create list element
      const li = document.createElement('li');
      // add class to list element
      li.className = 'collection-item';
      // create text node and append
      li.appendChild(document.createTextNode(task));
      // create link element
      const link = document.createElement('a');
      // add a class to link element
      link.className = 'delete-item secondary-content';
      // add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      // append the link to the list
      li.appendChild(link);
      // append the list to the unordered list
      taskList.appendChild(li);
  });
}

// add task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }
  // create list element
  const li = document.createElement('li');
  // add class to list element
  li.className = 'collection-item';
  // create text node and append
  li.appendChild(document.createTextNode(taskInput.value));
  // create link element
  const link = document.createElement('a');
  // add a class to link element
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append the link to the list
  li.appendChild(link);
  // append the list to the unordered list
  taskList.appendChild(li);
  // store in local storage
  storeTaskInLocalStorage(taskInput.value);
  // clear input
  taskInput.value = '';
  e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure you want to delete this task?')) {
      e.target.parentElement.parentElement.remove();
      // remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove tasks from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearTasks() {
  // slower
  taskList.innerHTML = '';
  // much faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear from local storage
  clearTasksFromLocalStorage();
}

// clear tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task) {
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
}
