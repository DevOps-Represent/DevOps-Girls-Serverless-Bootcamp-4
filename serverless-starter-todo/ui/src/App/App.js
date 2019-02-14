import React, { Component } from 'react';
import {
  StyleGuideProvider,
  Footer,
  PageBlock,
  Card,
  Section,
  Text
} from 'seek-style-guide/react';

import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';
import axios from 'axios';
import { BASE_URL } from '../config';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      todos: []
    };

    this.getTodos = this.getTodos.bind(this);
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  onCheckboxClick(event) {
    const todoId = parseInt(event.target.value, 10);
    const todoList = this.state.todos;
    const todoIndex = todoList.findIndex(todo => todo.id === todoId);
    const targetTodo = todoList[todoIndex];

    const newTodoList = [
      ...todoList.slice(0, todoIndex),
      { ...targetTodo, completed: !targetTodo.completed },
      ...todoList.slice(todoIndex + 1)
    ];

    this.setState({ todos: newTodoList });
  }

  onDelete(event) {
    const todoId = parseInt(event.target.value, 10);
    const todoList = this.state.todos;
    const todoIndex = todoList.findIndex(todo => todo.id === todoId);

    const newTodoList = [
      ...todoList.slice(0, todoIndex),
      ...todoList.slice(todoIndex + 1)
    ];

    this.setState({ todos: newTodoList });
  }

  getTodos() {
    axios
      .get(`${BASE_URL}/todos`, { params: { _limit: 10 } })
      .then(({ data }) => this.setState({ todos: data }));
  }

  render() {
    return (
      <StyleGuideProvider>
        <Header />
        <PageBlock>
          <Card transparent />

          <TodoList
            todos={this.state.todos}
            onChange={this.onCheckboxClick}
            onDelete={this.onDelete}
          />
        </PageBlock>

        <Footer />
      </StyleGuideProvider>
    );
  }
}
