let apiSubdomain = '';

const inputElement = document.getElementById('todo-input');
const listElement = document.getElementById('todo-list');
const subdomainElement = document.getElementById('todo-subdomain');
const submitElement = document.getElementById('todo-submit');

const apiUrl = () =>
  `https://${encodeURI(
    apiSubdomain
  ).toLowerCase()}.execute-api.ap-southeast-2.amazonaws.com/dev`;

const debounced = (delayMs, fn) => {
  let timerId;

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      timerId = null;
      fn(...args);
    }, delayMs);
  };
};

const updateInput = () => {
  submitElement.disabled = inputElement.value.trim() === '';
};

const updateSubdomain = debounced(500, () => {
  localStorage.setItem('apiSubdomain', subdomainElement.value);
  return loadPage();
});

const deleteTodo = id =>
  fetch(`${apiUrl()}/${encodeURI(id)}`, { method: 'DELETE' });

const getTodos = () => fetch(apiUrl()).then(response => response.json());

const writeTodo = (id, description) =>
  fetch(`${apiUrl()}/${encodeURI(id)}`, { body: description, method: 'PUT' });

const newTodoElement = (id, description) => {
  const todo = document.createElement('div');
  todo.className = 'todo-item';

  const input = document.createElement('input');
  input.type = 'text';
  input.value = description;
  input.setAttribute('data-id', id);
  input.oninput = debounced(500, () => writeTodo(id, input.value));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '×';
  deleteButton.onclick = async () => {
    deleteButton.disabled = true;

    try {
      await deleteTodo(id);

      deleteButton.parentNode.parentNode.removeChild(deleteButton.parentNode);
    } catch {
      deleteButton.disabled = false;
    }
  };

  todo.appendChild(input);
  todo.appendChild(deleteButton);

  return todo;
};

const redrawTodos = todos => {
  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }

  todos
    .map(({ id, description }) => newTodoElement(id, description))
    .forEach(todo => listElement.appendChild(todo));
};

const submitTodo = async () => {
  const id = Date.now();
  const description = inputElement.value.trim();
  if (description === '') {
    return;
  }

  inputElement.disabled = true;
  submitElement.disabled = true;

  try {
    await writeTodo(id, description);

    const todo = newTodoElement(id, description);
    listElement.appendChild(todo);

    inputElement.value = '';
  } finally {
    inputElement.disabled = false;
    submitElement.disabled = false;
  }
};

const loadPage = async () => {
  apiSubdomain = localStorage.getItem('apiSubdomain');
  subdomainElement.value = apiSubdomain;

  const todos = await getTodos();
  redrawTodos(todos);
};

loadPage();
