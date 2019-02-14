import React from 'react';
import { CardGroup } from 'seek-style-guide/react';
import TodoItem from './components/TodoItem/TodoItem';

const TodoList = ({ todos, onChange }) => (
  <CardGroup>
    {todos.map((todo, index) => (
      <TodoItem todo={todo} key={index} onChange={onChange} />
    ))}
  </CardGroup>
);

export default TodoList;
