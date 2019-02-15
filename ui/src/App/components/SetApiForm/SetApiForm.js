import React, { Component } from 'react';
import {
  Card,
  Section,
  Text,
  TextField,
  TextLink
} from 'seek-style-guide/react';

export default class SetApiForm extends Component {
  render() {
    const {
      showSetApiForm,
      onSetApiClick,
      apiUrl,
      handleApiUrlChange
    } = this.props;
    return (
      <Card>
        <Section>
          <Text>
            <TextLink
              chevron={showSetApiForm ? 'up' : 'down'}
              onClick={onSetApiClick}
            >
              Set API URL
            </TextLink>
          </Text>
          {showSetApiForm && (
            <TextField
              id="apiUrl"
              value={apiUrl}
              onChange={handleApiUrlChange}
            />
          )}
        </Section>
      </Card>
    );
  }
}
