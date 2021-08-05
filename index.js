const inputBox = document.querySelector(".todoInput input");
const addBtn = document.querySelector(".todoInput button");
const todoList = document.querySelector(".list-group");
const taskNum = document.querySelector(".tasknum");
const clearBtn = document.querySelector(".clearbtn");

showTasks();

inputBox.addEventListener('keydown', function(event){
  if(event.key === 'Enter'){
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("key");
    if(userData==""){
      alert("Please enter a valid task");
      return;
    }
    else if(getLocalStorage === null){
      listArr = [];
    }
    else {
      listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("key", JSON.stringify(listArr));
    showTasks();
  }
})

addBtn.onclick = ()=>{
  let userData = inputBox.value;
  let getLocalStorage = localStorage.getItem("key");
  if(userData==""){
    alert("Please enter a valid task.");
    return;
  }
  else if(getLocalStorage === null){
    listArr = [];
  }
  else {
    listArr = JSON.parse(getLocalStorage);
  }
  listArr.push(userData);
  localStorage.setItem("key", JSON.stringify(listArr));
  showTasks();
};

function showTasks(){
  let getLocalStorage = localStorage.getItem("key");
  if(getLocalStorage === null){
    listArr = [];
  }
  else {
    listArr = JSON.parse(getLocalStorage);
  }
  taskNum.innerHTML = listArr.length;
  let newLi='';
  listArr.forEach((ele, index) => {
    newLi += `<li class="list-group-item"> ${ele} <span onclick = "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLi;
  inputBox.value = "";
}

function deleteTask(index){
  let getLocalStorage = localStorage.getItem("key");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index,1);
  localStorage.setItem("key", JSON.stringify(listArr));
  showTasks();
}

clearBtn.onclick = ()=>{
  if(!listArr.length){
    alert("There are no Todos!");
  }
  listArr = [];
  localStorage.setItem("key", JSON.stringify(listArr));
  showTasks();
};
