let todoForm = document.querySelector("#todo-form"),
  todoInput = document.querySelector("#todo-input"),
  todoListGroup = document.querySelector("#todo-list-group"),
  todosCount = document.querySelector('#todo-count')

let todos = [];
let todoInitialId = 0;

function TodoProtype(text, id) {
  this.id = id;
  this.text = text;
}



function editTodo(todoText, todoId) {
  for (i = 0; i < todos.length; i++) {
    if (todos[i].id == todoId) {
      todos[i].text = todoText;
    }
  }

}

function removeTodo(todoId) {
  document.querySelector(`#todo-number-${todoId} `).remove();

  for (i = 0; i < todos.length; i++) {
    if (todos[i].id == todoId) {
      todos.slice(i, 1);
    }
  }

  todosCount.textContent = todos.length

}

function todoCreateDOM(todoText, todoId) {
  let listItem = document.createElement("li");
  let deleteBtn = document.createElement("button");
  let todoEditInput = document.createElement("input");

  listItem.setAttribute(
    "class",
    "list-group-item d-flex align-items-center justify-content-between"
  );
  listItem.setAttribute("id", `todo-number-${todoId}`);

  deleteBtn.setAttribute("class", "btn btn-outline-danger");
  deleteBtn.textContent = "O'chirish";

  todoEditInput.value = todoText;
  todoEditInput.setAttribute("class", "todo-edit-input");
  todoEditInput.disabled = true;

  listItem.addEventListener("dblclick", () => {
    todoEditInput.disabled = false;
    todoEditInput.focus();
    todoEditInput.style.borderBottom = "1px solid blue";
  });

  todoEditInput.addEventListener("blur", () => {
    if (todoEditInput.value.length > 0) {
      editTodo(todoEditInput.value, todoId);
      todoEditInput.disabled = true;
      todoEditInput.style.borderBottom = "1px solid transparent";
    } else {
      todoEditInput.style.borderBottom = "1px solid #ff0000";
    }
  });

  todoEditInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && todoEditInput.value.length > 0) {
      editTodo(todoEditInput.value, todoId);
      todoEditInput.disabled = true;
      todoEditInput.style.borderBottom = "1px solid transparent";
      todoEditInput.blur();
    } else {
      todoEditInput.style.borderBottom = "1px solid #ff0000";
    }
  });

  deleteBtn.addEventListener("click", () => {
    removeTodo(todoId);
  });

  listItem.appendChild(todoEditInput);
  listItem.appendChild(deleteBtn);
  todoListGroup.appendChild(listItem);
}

function todoCreate(todoText, todoId) {
  todoCreateDOM(todoText, todoId);
  todos.push(new TodoProtype(todoText, todoId));

  todosCount.textContent = todos.length

}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if(todoInput.value.length > 0) {
    todoCreate(todoInput.value, todoInitialId)
  }

  todoForm.reset();

  todoInitialId++;

  console.log(todos);
});


