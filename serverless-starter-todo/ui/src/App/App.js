import React, { Component } from 'react';
import {
  StyleGuideProvider,
  Footer,
  PageBlock,
  Card,
  Section,
  Alert,
  Text,
  TextLink,
  TextField
} from 'seek-style-guide/react';
import axios from 'axios';
import uuid from 'uuid/v4';

import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';
import NewTodoForm from './components/NewTodoForm/NewTodoForm';
import { PLACEHOLDER_BASE_URL } from '../config';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      error: '',
      apiUrl: PLACEHOLDER_BASE_URL,
      showSetApiForm: false
    };

    this.getTodos = this.getTodos.bind(this);
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.clearError = this.clearError.bind(this);
    this.onSetApiClick = this.onSetApiClick.bind(this);
    this.handleApiUrlChange = this.handleApiUrlChange.bind(this);
    this.checkForSavedUrl = this.checkForSavedUrl.bind(this);
    this.clearErrorIfEquals = this.clearErrorIfEquals.bind(this);
  }

  componentDidMount() {
    this.checkForSavedUrl();
  }

  clearErrorIfEquals(errMessage) {
    if (this.state.error === errMessage) {
      this.clearError();
    }
  }

  checkForSavedUrl() {
    const existingUrl = localStorage.getItem('apiUrl');
    if (existingUrl) {
      this.setState({ apiUrl: existingUrl }, this.getTodos);
    } else {
      this.getTodos();
    }
  }

  onCheckboxClick(event) {
    const todoId = event.target.value;
    const { todos: todoList, apiUrl } = this.state;
    const url = apiUrl || PLACEHOLDER_BASE_URL;
    const todoIndex = todoList.findIndex(todo => todo.id.toString() === todoId);
    const targetTodo = todoList[todoIndex];

    const newTodo = { ...targetTodo, completed: !targetTodo.completed };

    const newTodoList = [
      ...todoList.slice(0, todoIndex),
      newTodo,
      ...todoList.slice(todoIndex + 1)
    ];

    this.setState({ todos: newTodoList });

    const errMessage = 'Unable to update todo status';
    axios
      .put(`${url}/todo/${newTodo.id}`, newTodo)
      .then(() => this.clearErrorIfEquals(errMessage))
      .catch(() =>
        this.setState({
          error: errMessage,
          todos: todoList
        })
      );
  }

  deleteTodo(todoId) {
    const { todos: todoList, apiUrl } = this.state;
    const url = apiUrl || PLACEHOLDER_BASE_URL;
    const todoIndex = todoList.findIndex(todo => todo.id.toString() === todoId);

    const newTodoList = [
      ...todoList.slice(0, todoIndex),
      ...todoList.slice(todoIndex + 1)
    ];

    this.setState({ todos: newTodoList });
    const errMessage = 'Unable to delete todo';
    axios
      .delete(`${url}/todo/${todoId}`)
      .then(() => this.clearErrorIfEquals(errMessage))
      .catch(() => this.setState({ error: errMessage, todos: todoList }));
  }

  onDelete(event) {
    event.preventDefault();
    const todoId = event.target[0].value;
    this.deleteTodo(todoId);
  }

  addNewTodo(newTodoTitle) {
    const { todos: existingTodos, apiUrl } = this.state;
    const url = apiUrl || PLACEHOLDER_BASE_URL;

    const newTodo = {
      id: uuid(),
      completed: false,
      title: newTodoTitle
    };

    const newTodoList = [newTodo, ...existingTodos];

    this.setState({ todos: newTodoList });
    axios
      .post(`${url}/todos`, newTodo)
      .then(() => this.clearErrorIfEquals('Unable to save todo'))
      .catch(() => {
        this.deleteTodo(newTodo.id);
        this.setState({ error: 'Unable to save todo' });
      });
  }

  clearError() {
    this.setState({ error: '' });
  }

  onSetApiClick() {
    this.setState(({ showSetApiForm: oldShowForm }) => ({
      showSetApiForm: !oldShowForm
    }));
  }

  handleApiUrlChange(event) {
    this.setState({ apiUrl: event.target.value }, () => {
      localStorage.setItem('apiUrl', this.state.apiUrl);
      this.getTodos();
    });
  }

  getTodos() {
    const url = this.state.apiUrl || PLACEHOLDER_BASE_URL;
    const errMessage = 'Unable to retrieve todos';
    axios
      .get(`${url}/todos`, { params: { _limit: 10 } })
      .then(({ data }) => {
        this.clearErrorIfEquals(errMessage);
        this.setState({ todos: data });
      })
      .catch(() => {
        this.setState({ error: errMessage, todos: [] });
      });
  }

  render() {
    const { todos, error, showSetApiForm, apiUrl } = this.state;
    return (
      <StyleGuideProvider>
        <Header />

        <PageBlock>
          <Card>
            <Section>
              <Text>
                <TextLink
                  chevron={showSetApiForm ? 'up' : 'down'}
                  onClick={this.onSetApiClick}
                >
                  Set API URL
                </TextLink>
              </Text>
              {showSetApiForm && (
                <TextField
                  id="apiUrl"
                  value={apiUrl}
                  onChange={this.handleApiUrlChange}
                />
              )}
            </Section>
          </Card>

          <NewTodoForm addNewTodo={this.addNewTodo} />

          {error && (
            <Card>
              <Alert
                tone="info"
                level="secondary"
                message={error}
                onClose={this.clearError}
              />
            </Card>
          )}

          <TodoList
            todos={todos}
            onChange={this.onCheckboxClick}
            onDelete={this.onDelete}
          />
        </PageBlock>

        <Footer />
      </StyleGuideProvider>
    );
  }
}
