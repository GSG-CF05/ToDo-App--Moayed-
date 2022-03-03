let toDoInput = document.getElementById("todoInput");
let addToDoBtn = document.getElementById("add");
let todosList = document.getElementById("todosList");

addToDoBtn.addEventListener("click", addToDo);

let toDosArr;
// to show todos lst
loadToDos();
function addToDo(e) {
  e.preventDefault();
  if (toDoInput.value != "") {
    toDosArr.push(toDoInput.value);
    localStorage.setItem("todos", JSON.stringify(toDosArr));
    toDoInput.value = "";
    loadToDos();
  }
}
// edit todo item based on index with the new text
function editToDo(index, newTxe) {
  toDosArr[index] = newTxe;
  localStorage.setItem("todos", JSON.stringify(toDosArr));
  loadToDos();
}
// Show or hide the edit input and the save button 
function showOrHideEditDiv(index) {
  let allTodos = document.querySelectorAll("li > div.todoItem");
  let editTodo = document.querySelectorAll("li > div.editTodo");

  if (getComputedStyle(allTodos[index]).display == "none") {
    allTodos[index].style.display = "block";
  } else {
    allTodos[index].style.display = "none";
  }

  if (getComputedStyle(editTodo[index]).display == "none") {
    editTodo[index].style.display = "block";
  } else {
    editTodo[index].style.display = "none";
  }
}
// delete todo item based on index
function deleteToDo(index) {
  toDosArr.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(toDosArr));
  loadToDos();
}

// Create the  list items 
function loadToDos() {
  // reset the todos list view
  resetArray();

  for (let i = 0; i < toDosArr.length; i++) {
    let todoLi = document.createElement("li");
    // Create the div that contains the todo item , edit button and delete button
    let todoDiv = document.createElement("div");
    todoDiv.className = "todoItem";
    todoDiv.innerText = toDosArr[i];
    // create and append the edit button and icon
    let editBtn = document.createElement("button");
    let editIcon = document.createElement("i");
    editIcon.className = "fa fa-edit";
    editBtn.setAttribute("onclick", "showOrHideEditDiv(" + i + ")");
    editBtn.appendChild(editIcon);
    todoDiv.appendChild(editBtn);
    // create and append the delete button and icon
    let delBtn = document.createElement("button");
    let delIcon = document.createElement("i");
    delIcon.className = "fa fa-trash";
    delBtn.setAttribute("onclick", "deleteToDo(" + i + ")");
    delBtn.appendChild(delIcon);
    todoDiv.appendChild(delBtn);
    // append the todo div to the li
    todoLi.appendChild(todoDiv);
    // create the edit div that contains the edit input and save button
    let editDiv = document.createElement("div");
    editDiv.className = "editTodo";
    // create the edit input
    let editInput = document.createElement("input");
    editInput.setAttribute("type", "text");
    editInput.setAttribute("value", toDosArr[i]);
    editDiv.appendChild(editInput);
    // create save button
    let saveBtn = document.createElement("button");
    saveBtn.innerText = "save";
    saveBtn.setAttribute(
      "onclick",
      "editToDo(" +
        i +
        ", document.querySelectorAll('li > div.editTodo > input')[" +
        i +
        "].value )"
    );
    editDiv.appendChild(saveBtn);

    // append edit div to the li
    todoLi.appendChild(editDiv);
    // append li to the todo ul
    todosList.appendChild(todoLi);
  }
}

// Remove or refresh  the original todos list elementst
function resetArray() {
  let child = todosList.lastElementChild;
  while (child) {
    todosList.removeChild(child);
    child = todosList.lastElementChild;
  }
  if (localStorage.getItem("todos") !== null) {
    toDosArr = JSON.parse(localStorage.getItem("todos"));
  } else {
    toDosArr = [];
  }
}
