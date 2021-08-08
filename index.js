
const inputBox = document.querySelector(".todoInput input");
const addBtn = document.querySelector(".todoInput button");
const todoList = document.querySelector(".list-group");
const taskNum = document.querySelector(".tasknum");
const clearBtn = document.querySelector(".clearbtn");
const deadline = document.querySelector(".deadline");
let tasks = document.querySelectorAll(".list-group-item");
let dateArr = [];

showTasks();

window.onload = function() {
  let today = new Date();
  let a = '';
  dateArr.forEach((ele, index) => {
    a = dateArr[index].split('-');
    if ((a[0] < today.getDate() && a[1] - 1 <= today.getMonth() && a[2] <= today.getFullYear()) || (a[1] - 1 < today.getMonth() && a[2] <= today.getFullYear()) || a[2] < today.getFullYear()) {
      alert("The deadline for the task " + listArr[index] + " has passed!");
      var elem = document.getElementById(index);
      elem.style.color = " #6e45e1";
    }
  });
}

function taskDue() {
  let today = new Date();
  let a = '';
  dateArr.forEach((ele, index) => {
    a = dateArr[index].split('-');
    if ((a[0] < today.getDate() && a[1] - 1 <= today.getMonth() && a[2] <= today.getFullYear()) || (a[1] - 1 < today.getMonth() && a[2] <= today.getFullYear()) || a[2] < today.getFullYear()) {
      var elem = document.getElementById(index);
      elem.style.color = " #6e45e1";
    }
  });
};

inputBox.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addData();
  }
});

addBtn.onclick = () => {
  addData();
};

function addData() {
  let userData = inputBox.value;
  let dueDate = deadline.value;
  let today = new Date();
  let a = dueDate.split('-');
  let getLocalStorage = localStorage.getItem("key");
  let getLocalStorage2 = localStorage.getItem("key2");
  if (userData == "") {
    alert("Please enter a valid task");
    return;
  } else if (getLocalStorage === null || getLocalStorage2 === null) {
    listArr = [];
    dateArr = [];
  } else {
    if (dueDate == '') {
      alert("Please enter a deadline");
      return;
    }
    else if ((a[2] < today.getDate() && a[1] - 1 <= today.getMonth()) || a[1] - 1 < today.getMonth() || a[0] < today.getFullYear()) {
      alert("Please enter a valid due date");
      return;
    }
    listArr = JSON.parse(getLocalStorage);
    dateArr = JSON.parse(getLocalStorage2);
  }
  listArr.push(userData);
  const date = a[2] + '-' + a[1] + '-' + a[0];
  dateArr.push(date);
  deadline.value = '';
  localStorage.setItem("key", JSON.stringify(listArr));
  localStorage.setItem("key2", JSON.stringify(dateArr));
  showTasks();
};

function showTasks() {
  let getLocalStorage = localStorage.getItem("key");
  let getLocalStorage2 = localStorage.getItem("key2");
  if (getLocalStorage === null || getLocalStorage2 === null) {
    listArr = [];
    dateArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
    dateArr = JSON.parse(getLocalStorage2);
  }
  taskNum.innerHTML = listArr.length;
  let newLi = '';
  listArr.forEach((ele, index) => {
    newLi += `<li class="list-group-item" id='${index}'> ${ele} <span class="date"> ${dateArr[index]}</span> <span class="deleteBtn" onclick = "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLi;
  inputBox.value = "";
  taskDue();
};

function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("key");
  let getLocalStorage2 = localStorage.getItem("key2");
  listArr = JSON.parse(getLocalStorage);
  dateArr = JSON.parse(getLocalStorage2);
  listArr.splice(index, 1);
  dateArr.splice(index, 1);
  localStorage.setItem("key", JSON.stringify(listArr));
  localStorage.setItem("key2", JSON.stringify(dateArr));
  showTasks();
  taskDue();
};

clearBtn.onclick = () => {
  if (!listArr.length) {
    alert("There are no Todos!");
  }
  listArr = [];
  dateArr = [];
  localStorage.setItem("key", JSON.stringify(listArr));
  localStorage.setItem("key2", JSON.stringify(dateArr));
  showTasks();
  taskDue();
};
