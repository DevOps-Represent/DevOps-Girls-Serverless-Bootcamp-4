const API_SUBDOMAIN = 'yt5bljpgs2';

const apiUrl = `https://${encodeURI(
  API_SUBDOMAIN
)}.execute-api.ap-southeast-2.amazonaws.com/dev`;

const descriptionElement = document.getElementById('todo-description');
const listElement = document.getElementById('todo-list');
const submitElement = document.getElementById('todo-submit');

function deleteTodo(id) {
  return fetch(`${apiUrl}/${encodeURI(id)}`, {
    method: 'DELETE'
  });
}

async function getTodos() {
  const response = await fetch(apiUrl);

  return response.json();
}

function writeTodo(id, description) {
  return fetch(`${apiUrl}/${encodeURI(id)}`, {
    body: description,
    method: 'PUT'
  });
}

function redrawTodos(todos) {
  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }

  todos.forEach(({ id, description }) => {
    const todo = document.createElement('div');
    todo.className = 'todo-item';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✘';
    deleteButton.onclick = async function() {
      await deleteTodo(id);

      deleteButton.parentNode.parentNode.removeChild(deleteButton.parentNode);
    };

    todo.appendChild(deleteButton);

    const p = document.createElement('p');
    p.contentEditable = 'true';
    p.setAttribute('data-id', id);
    p.onblur = async function() {
      await writeTodo(id, p.innerText);
    };

    const text = document.createTextNode(description);
    p.appendChild(text);

    todo.appendChild(p);

    listElement.appendChild(todo);
  });
}

async function submitTodo() {
  descriptionElement.disabled = true;
  submitElement.disabled = true;

  const id = Date.now();

  try {
    await writeTodo(id, descriptionElement.value);

    await loadPage();

    descriptionElement.value = '';
  } finally {
    descriptionElement.disabled = false;
    submitElement.disabled = false;
  }
}

const loadPage = async () => {
  const todos = await getTodos();
  redrawTodos(todos);
};

loadPage();
