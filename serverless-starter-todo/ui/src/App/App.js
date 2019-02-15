import React, { Component } from 'react';
import {
  StyleGuideProvider,
  Footer,
  PageBlock,
  Card,
  Section,
  Text,
  Alert
} from 'seek-style-guide/react';
import axios from 'axios';
import uuid from 'uuid/v4';

import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';
import NewTodoForm from './components/NewTodoForm/NewTodoForm';
import { BASE_URL } from '../config';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      error: ''
    };

    this.getTodos = this.getTodos.bind(this);
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  onCheckboxClick(event) {
    const todoId = event.target.value;
    const todoList = this.state.todos;
    const todoIndex = todoList.findIndex(todo => todo.id.toString() === todoId);
    const targetTodo = todoList[todoIndex];

    const newTodoList = [
      ...todoList.slice(0, todoIndex),
      { ...targetTodo, completed: !targetTodo.completed },
      ...todoList.slice(todoIndex + 1)
    ];

    this.setState({ todos: newTodoList });
  }

  deleteTodo(todoId) {
    const todoList = this.state.todos;
    const todoIndex = todoList.findIndex(todo => todo.id.toString() === todoId);

    const newTodoList = [
      ...todoList.slice(0, todoIndex),
      ...todoList.slice(todoIndex + 1)
    ];

    this.setState({ todos: newTodoList });
  }

  onDelete(event) {
    event.preventDefault();
    const todoId = event.target[0].value;
    this.deleteTodo(todoId);
  }

  addNewTodo(newTodoTitle) {
    const existingTodos = this.state.todos;

    const newTodo = {
      id: uuid(),
      completed: false,
      title: newTodoTitle,
    };

    const newTodoList = [newTodo, ...existingTodos];

    this.setState({ todos: newTodoList });
    axios.post(`${BASE_URL}/todos`, newTodo).catch(() => {
      this.deleteTodo(newTodo.id);
      this.setState({ error: 'Unable to save todo' });
    });
  }

  clearError() {
    this.setState({ error: '' });
  }

  getTodos() {
    axios
      .get(`${BASE_URL}/todos`, { params: { _limit: 10 } })
      .then(({ data }) => this.setState({ todos: data }));
  }

  render() {
    const { todos, error } = this.state;
    return (
      <StyleGuideProvider>
        <Header />
        <PageBlock>
          <Card transparent>
            <Section pullout>
              <Button 
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
