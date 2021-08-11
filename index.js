const inputBox = document.querySelector(".todoInput input");
const addBtn = document.querySelector(".todoInput button");
const todoList = document.querySelector(".list-group");
const taskNum = document.querySelector(".tasknum");
const clearBtn = document.querySelector(".clearbtn");
const deadline = document.querySelector(".deadline");

showTasks();

window.onload = function() {
  let today = new Date();
  let a = '';
  dateArr.forEach((ele, index) => {
    a = dateArr[index].split('-');
    if ((a[0] < today.getDate() && a[1] - 1 <= today.getMonth() && a[2] <= today.getFullYear()) || (a[1] - 1 < today.getMonth() && a[2] <= today.getFullYear()) || a[2] < today.getFullYear()) {
      alert("The deadline for the task"+ " ' " + listArr[index]+ " ' " + "has passed!");
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
  if (!listArr.length) {
    document.querySelector(".tasks").innerHTML = `You have <span class="tasknum"> no </span> pending tasks. <button type="button" class="btn btn-outline-secondary clearbtn">Clear All</button>`;
  } else if (listArr.length === 1) {
    document.querySelector(".tasks").innerHTML = `You have <span class="tasknum"> 1 </span> task pending. <button type="button" class="btn btn-outline-secondary clearbtn">Clear All</button>`;
  } else {
    taskNum.innerHTML = listArr.length;
  }
  let newLi = '';
  listArr.forEach((ele, index) => {
    if (ele.length > 30) {
      newLi += `<li class="list-group-item" id='${index}'> ${ele} 
                  <p>
                    <span class="date"> ${dateArr[index]}</span>
                    <span class="deleteBtn" onclick = "deleteTask(${index})";>  <i class="fas fa-trash">  </i>  </span>
                  </p>
                </li>`;
    } else {
      newLi += `<li class="list-group-item" id='${index}'> ${ele}
                  <span class="date"> ${dateArr[index]}</span>
                  <span class="deleteBtn" onclick = "deleteTask(${index})";>  <i class="fas fa-trash">  </i>  </span>
                </li>`;
    }
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

  if (confirm("Do you want to mark this task as completed?")) {
    let getLocalStorage3 = localStorage.getItem("key3");
    let getLocalStorage4 = localStorage.getItem("key4");
    if (getLocalStorage3 === null || getLocalStorage4 === null) {
      deletedTasks = [];
      deletedDates = [];
    } else {
      deletedTasks = JSON.parse(getLocalStorage3);
      deletedDates = JSON.parse(getLocalStorage4);
    }
    deletedTasks.push(listArr[index]);
    listArr.splice(index, 1);
    deletedDates.push(dateArr[index]);
    dateArr.splice(index, 1);
    localStorage.setItem("key", JSON.stringify(listArr));
    localStorage.setItem("key2", JSON.stringify(dateArr));
    localStorage.setItem("key3", JSON.stringify(deletedTasks));
    localStorage.setItem("key4", JSON.stringify(deletedDates));
  }
  else if(confirm("Do you want to delete this task?")){
    listArr.splice(index, 1);
    dateArr.splice(index, 1);
    localStorage.setItem("key", JSON.stringify(listArr));
    localStorage.setItem("key2", JSON.stringify(dateArr));
  }
  showTasks();
  taskDue();
};

clearBtn.onclick = () => {
  if (!listArr.length) {
    alert("There are no Todos!");
  } else {
    confirm("Are you sure you want to clear this list?");
  }
  listArr = [];
  dateArr = [];
  localStorage.setItem("key", JSON.stringify(listArr));
  localStorage.setItem("key2", JSON.stringify(dateArr));
  showTasks();
  taskDue();
};
