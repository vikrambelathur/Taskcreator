// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  //Remove Tasks
  taskList.addEventListener('click', removeTask);
  //Clear Tasks
  clearBtn.addEventListener('click', clearTasks);
  //Filter Tasks
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks 

function getTasks() {
let tasks;
if(localStorage.getItem('tasks') == null ){
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));

}
tasks.forEach(function(task) {

  const li = document.createElement('li');
  li.className = 'collection-item'; 
  //Create a text node
  li.appendChild(document.createTextNode(task));
  //Create link element
  const link = document.createElement('a');
  //Add class
 link.className = 'delete-item secondary-content';
 // Add icon HTML
 link.innerHTML = '<i class ="fa fa-remove"></i>';
 // Append the link to li
 li.appendChild(link);

 taskList.appendChild(li);

});
}


// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Please add a task first');
  }

  // Create li element

  const li = document.createElement('li');
  li.className = 'collection-item';
  //Create a text node
  li.appendChild(document.createTextNode(taskInput.value));
  //Create link element
  const link = document.createElement('a');
  //Add class
 link.className = 'delete-item secondary-content';
 // Add icon HTML
 link.innerHTML = '<i class ="fa fa-remove"></i>';
 // Append the link to li
 li.appendChild(link);

 taskList.appendChild(li);
 // Store in LS
 storeTaskInLocalStorage(taskInput.value);

 //Clear Tasks
 taskInput.value = '';
 console.log(li);
e.preventDefault();

}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') == null ){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  }


//Remove task

function removeTask (e){

  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure you want to delete the task')){
      e.target.parentElement.parentElement.remove();

      // Remove from LS

      removeTaskfromLocalStorage(e.target.parentElement.parentElement);

    }  
  }
}

//Remove from LS
function removeTaskfromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') == null ){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }
  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  }); 
  
  localStorage.setItem('tasks',JSON.stringify(tasks));

  }

// Clear Tasks

function clearTasks () {
  //taskList.innerHTML = ''; 

  // Faster approach
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

    //Clear from LS
    cleartasksfromLocalStorage() 
}

// Clear Taks from Local Storage

 function cleartasksfromLocalStorage(){
  localStorage.clear();
  
 }

// Filter Tasks

function filterTasks (e) {

  const text = e.target.value;
  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!= -1 ){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });

}