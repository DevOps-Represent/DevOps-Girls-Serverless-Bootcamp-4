import React, { Component } from 'react';
import {
  Card,
  Section,
  TextField,
  AsidedLayout,
  Button
} from 'seek-style-guide/react';

import styles from './NewTodoForm.less';

export default class NewTodoForm extends Component {
  constructor() {
    super();
    this.state = {
      newTodoTitle: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.addNewTodo(this.state.newTodoTitle);
    this.setState({ newTodoTitle: '' });
  }

  renderButton() {
    return (
      <div className={styles.addNewButton}>
        <Button type="submit" color="pink">
          Add
        </Button>
      </div>
    );
  }

  onChange({ target: { value } }) {
    this.setState({ newTodoTitle: value });
  }

  render() {
    return (
      <Card>
        <Section>
          <form onSubmit={this.onSubmit}>
            <AsidedLayout renderAside={this.renderButton}>
              <TextField
                id="newTodoField"
                label="New Todo"
                value={this.state.newTodoTitle}
                onChange={this.onChange}
              />
            </AsidedLayout>
          </form>
        </Section>
      </Card>
    );
  }
}
