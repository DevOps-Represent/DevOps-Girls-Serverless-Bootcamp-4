import React from 'react';
import {
  Button,
  Card,
  Section,
  AsidedLayout,
  Text
} from 'seek-style-guide/react';
import Checkbox from './components/Checkbox/Checkbox';
import styles from './TodoItem.less';

const TodoItem = ({ todo, onChange, onDelete }) => {
  const renderDelete = function() {
    return (
      <div className={styles.deleteIconWrapper}>
        <Button color="transparent" type="submit">
          <Text todoid={todo.id}>Delete</Text>
        </Button>
      </div>
    );
  };
  return (
    <Card>
      <Section>
        <form onSubmit={onDelete}>
          <AsidedLayout renderAside={renderDelete}>
            <Checkbox
              checked={todo.completed}
              id={`todo-${todo.id}-checkbox`}
              label={todo.title}
              onChange={onChange}
              value={todo.id.toString()}
            />
          </AsidedLayout>
        </form>
      </Section>
    </Card>
  );
};

export default TodoItem;
