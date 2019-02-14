import React from 'react';
import { Card, Section } from 'seek-style-guide/react';
import Checkbox from './components/Checkbox/Checkbox';

const TodoItem = ({ todo, onChange }) => (
  <Card>
    <Section>
      <Checkbox
        checked={todo.completed}
        id={`todo-${todo.id}-checkbox`}
        label={todo.title}
        onChange={onChange}
        value={todo.id}
      />
    </Section>
  </Card>
);

export default TodoItem;
