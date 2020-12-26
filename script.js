let form = document.getElementById("form");
let task = document.getElementById("task");
let outpot = document.getElementById("output");
let tasksCounrtContainer = document.querySelector(".conter");
let taskCounter = document.querySelector(".conter span");

// Load Tasks From LocalStorge
window.addEventListener("load", getTasks);

// Add Task On Submit Event
form.addEventListener("submit", addTask);

// function delet
document.body.addEventListener("click", deletTask);

// Func Add Task
function addTask(e) {
  e.preventDefault();
  if (task.value != "") {
    addOutpot();
    // Add Task to localstorage
    saveLocalTasks(task.value);
  } else {
    alert("Pleas Enter The Task");
  }
  task.value = "";
  counterTasks();
}

// add outpout
function addOutpot() {
  outpot.innerHTML += `
    <div class="list"> 
      <p>${task.value}</p>
      <span class="close">x</span>
    </div>`;
}

// saveLocalTasks
function saveLocalTasks(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Get Tasks From localstorge
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task) => {
    outpot.innerHTML += `
    <div class="list"> 
      <p>${task}</p>
      <span class="close">x</span>
    </div>`;
  });
  counterTasks();
}

// deleTask
function deletTask(e) {
  if (e.target.className == "close") {
    e.target.parentElement.remove();
  } else if (e.target.classList.contains("list")) {
    e.target.children[0].classList.toggle("complete");
  }
  // Dlete Tasks From localStorge
  function dleteLocalTasks() {
    let tasks = [];
    let listText = document.querySelectorAll(".list p");
    listText.forEach(list => {
     tasks.push(list.innerHTML);
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  dleteLocalTasks();
  counterTasks();
}

function counterTasks(){
  let taskCount = JSON.parse(localStorage.getItem("tasks")).length;
  if(taskCount > 0) {
    tasksCounrtContainer.style.display = "block";
    taskCounter.innerHTML = taskCount
  } else {
    tasksCounrtContainer.style.display = "none";
  }
}
