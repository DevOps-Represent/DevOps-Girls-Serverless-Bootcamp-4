const formElement = document.getElementById('todo-form');
const inputElement = document.getElementById('todo-input');
const listElement = document.getElementById('todo-list');
const subdomainElement = document.getElementById('todo-subdomain');
const submitElement = document.getElementById('todo-submit');

// const sortable = new Sortable.default(listElement, { draggable: '.todo-item' });

let apiUrl = '';

//
// api client
//

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

const deleteTodo = id =>
  fetch(`${apiUrl}/todo/${encodeURIComponent(id)}`, { method: 'DELETE' });

const getTodos = () =>
  fetch(`${apiUrl}/todo`)
    .then(response => response.json())
    .then(todos => todos.sort(({ id: a }, { id: b }) => a - b));

const writeTodo = (id, description) =>
  fetch(`${apiUrl}/todo/${encodeURIComponent(id)}`, {
    body: description,
    method: 'PUT'
  });

//
// app logic
//

const sanitiseUri = raw => raw && encodeURI(raw).toLowerCase();

const setApiUrl = () => {
  const rawParam = new URLSearchParams(window.location.search).get('api');
  const apiParam = rawParam && decodeURIComponent(rawParam);

  apiUrl = sanitiseUri(apiParam) || sanitiseUri(localStorage.getItem('api'));

  localStorage.setItem('api', apiUrl);

  subdomainElement.value = apiUrl;
};

const loadPage = async () => {
  setApiUrl();
  const todos = await getTodos();
  redrawTodos(todos);
};

const sortTodos = ({ data: { newIndex, oldIndex } }) => {
  // TODO: implement
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
    listElement.scrollTop = listElement.scrollHeight;

    inputElement.value = '';
  } finally {
    inputElement.disabled = false;
    submitElement.disabled = false;

    inputElement.focus();
  }
};

const updateInput = () => {
  submitElement.disabled = inputElement.value.trim() === '';
};

const updateSubdomain = debounced(500, () => {
  localStorage.setItem('api', subdomainElement.value);
  return loadPage();
});

const newTodoElement = (id, description) => {
  const todo = document.createElement('div');
  todo.className = 'todo-item';
  todo.setAttribute('data-id', id);

  const input = document.createElement('input');
  input.type = 'text';
  input.value = description;
  input.oninput = debounced(500, () => writeTodo(id, input.value));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '×';
  deleteButton.onclick = async () => {
    deleteButton.disabled = true;

    try {
      await deleteTodo(id);

      listElement.removeChild(deleteButton.parentNode);
    } catch (err) {
      console.error(err);
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

//
// event listeners
//

formElement.addEventListener('submit', event => {
  event.preventDefault();
  return submitTodo();
});

inputElement.addEventListener('input', updateInput);

subdomainElement.addEventListener('input', updateSubdomain);

// sortable.on('sortable:stop', sortTodos);

loadPage();
