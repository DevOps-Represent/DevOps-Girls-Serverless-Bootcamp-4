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
  fetch(`${apiUrl}/todos`)
    .then(response => response.json())
    .then(todos => todos.sort(({ id: a }, { id: b }) => a - b));

const writeTodo = ({ completed, id, title }) =>
  fetch(`${apiUrl}/todo/${encodeURIComponent(id)}`, {
    body: JSON.stringify({ completed, title }),
    method: 'PUT'
  });

//
// app logic
//

const sanitiseUri = raw =>
  raw &&
  encodeURI(raw)
    .toLowerCase()
    .replace(/\/$/, '');

const setApiUrl = () => {
  apiUrl = sanitiseUri(localStorage.getItem('api'));
  subdomainElement.value = apiUrl;
};

const loadPage = async () => {
  setApiUrl();
  const todos = await getTodos();
  redrawTodos(todos);
};

const submitTodo = async () => {
  const completed = false;
  const id = Date.now();
  const title = inputElement.value.trim();
  if (title === '') {
    return;
  }

  inputElement.disabled = true;
  submitElement.disabled = true;

  try {
    await writeTodo({ completed, id, title });

    const todo = newTodoElement({ completed, id, title });
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

const newTodoElement = ({ completed, id, title }) => {
  const todo = document.createElement('div');
  todo.className = 'todo-item';
  todo.setAttribute('data-completed', completed);
  todo.setAttribute('data-id', id);

  const input = document.createElement('input');
  input.type = 'text';
  input.value = title;
  input.oninput = debounced(500, () =>
    writeTodo({ completed, id, title: input.value })
  );

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '×';
  deleteButton.onclick = async () => {
    deleteButton.disabled = true;

    try {
      await deleteTodo(id);

      listElement.removeChild(todo);
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
    .map(({ completed, id, title }) => newTodoElement({ completed, id, title }))
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

const rawParam = new URLSearchParams(window.location.search).get('api');

if (rawParam) {
  localStorage.setItem('api', sanitiseUri(decodeURIComponent(rawParam)));
}

loadPage();
