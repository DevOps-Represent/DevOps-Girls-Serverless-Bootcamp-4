import React, { Component } from 'react';
import {
  Button,
  Card,
  Section,
  AsidedLayout,
  Text
} from 'seek-style-guide/react';
import Checkbox from './components/Checkbox/Checkbox';
import styles from './TodoItem.less';

export default class TodoItem extends Component {
  constructor() {
    super();

    this.renderDelete = this.renderDelete.bind(this);
  }

  renderDelete() {
    return (
      <div className={styles.deleteIconWrapper}>
        <Button color="transparent" type="submit">
          <Text todoid={this.props.todo.id}>Delete</Text>
        </Button>
      </div>
    );
  }

  render() {
    const { todo, onChange, onDelete } = this.props;
    return (
      <Card>
        <Section>
          <form onSubmit={onDelete}>
            <AsidedLayout renderAside={this.renderDelete}>
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
  }
}
