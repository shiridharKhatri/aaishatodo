document.addEventListener("DOMContentLoaded", function () {
  // Load existing todos and history from local storage
  loadTodos();
  loadHistory();

  // Event listener for add button
  document.querySelector("button").addEventListener("click", function (e) {
    e.preventDefault();
    addTodo();
  });

  // Event delegation for delete and complete buttons
  document.getElementById("todoList").addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const button = e.target;
      if (button.classList.contains("delete")) {
        deleteTodo(button);
      } else if (button.classList.contains("complete")) {
        completeTodo(button);
      }
    }
  });
});

function addTodo() {
  // Get input value
  const todoInput = document.getElementById("todoInput");
  const todoText = todoInput.value.trim();

  // Add todo to the list
  if (todoText !== "") {
    const todoList = document.getElementById("todoList");
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${todoText}</span>
            <div class="btns">
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
            <button class="complete"><i class="fa-solid fa-check"></i></button>
            </div>
        `;
    todoList.appendChild(li);

    // Save todo to local storage
    saveTodos();

    // Clear input
    todoInput.value = "";
  }
}

function deleteTodo(button) {
  const todoList = document.getElementById("todoList");
  const historyList = document.getElementById("historyList");
  const li = button.parentElement.parentElement;
  todoList.removeChild(li);

  // Move todo to history
  const historyLi = document.createElement("li");
  historyLi.innerHTML = li.innerHTML;
  historyLi.style.border = ".2rem solid rgba(209,26,41,0.9)";
  historyList.appendChild(historyLi);
  // Save todo and history to local storage
  saveTodos();
  saveHistory();
  // loadHistory()
}

function completeTodo(button) {
  const todoList = document.getElementById("todoList");
  const historyList = document.getElementById("historyList");
  const li = button.parentElement.parentElement;
  li.classList.toggle("completed");

  // Move todo to history
  const historyLi = document.createElement("li");
  historyLi.innerHTML = li.innerHTML;
  historyLi.style.border = ".2rem solid rgba(5,203,134,0.9)";
  historyList.appendChild(historyLi);
  todoList.removeChild(li);

  // Save todo and history to local storage
  saveTodos();
  saveHistory();
  // loadHistory()
}

function saveTodos() {
  const todoList = document.getElementById("todoList");
  const todos = [];
  for (const li of todoList.children) {
    const text = li.querySelector("span").innerText;
    const completed = li.classList.contains("completed");
    todos.push({ text, completed });
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const todoList = document.getElementById("todoList");
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  for (const todo of todos) {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${todo.text}</span>
            <div class="btns">
            <button onclick="deleteTodo(this)"><i class="fa-solid fa-trash"></i></button>
            <button onclick="completeTodo(this)"><i class="fa-solid fa-check"></i></button>
            </div>
           
        `;
    if (todo.completed) {
      li.classList.add("completed");
    }
    todoList.appendChild(li);
  }
}

function saveHistory() {
  const historyList = document.getElementById("historyList");
  const history = [];
  for (const li of historyList.children) {
    const style = li.style.border;
    const text = li.querySelector("span").innerText;
    const completed = li.classList.contains("completed");
    history.push({ text, completed, style });
  }
  localStorage.setItem("history", JSON.stringify(history));
}

function loadHistory() {
  const historyList = document.getElementById("historyList");
  const history = JSON.parse(localStorage.getItem("history")) || [];
  for (const todo of history) {
    const li = document.createElement("li");
    li.style.border = todo.style;
    li.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="deleteHistory(this)"><i class="fa-solid fa-trash"></i></button>
        `;
    if (todo.completed) {
      li.classList.add("completed");
    }
    historyList.appendChild(li);
  }
}

function deleteHistory(button) {
  const historyList = document.getElementById("historyList");
  const li = button.parentElement;
  historyList.removeChild(li);

  // Save history to local storage
  saveHistory();
}
let close = document.getElementById("close");
close.addEventListener("click", () => {
  let popup = document.getElementById("popup");
  popup.style.left = "-100%";
});
let menu = document.getElementById("menu");
menu.addEventListener("click", () => {
  let popup = document.getElementById("popup");
  popup.style.left = "0";
});
