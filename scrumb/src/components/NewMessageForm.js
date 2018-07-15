import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { MESSAGES_URL } from '../constants/ChatConstants';
import AuthStore from '../stores/AuthStore';

class NewMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      discussion_id: props.discussionId
    }
  }

  componentWillReceiveProps = newProps => {
    this.setState({
      discussion_id: newProps.discussionId
    });
  }

  handleChange = e => {
    this.setState({
      content: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const bodyString = JSON.stringify({
      ...this.state,
      content: this.state.content.trim()
    });

    fetch(MESSAGES_URL, {
      method: 'POST',
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: bodyString
    });
    this.setState({ content: '' });
  }

  render = () => {
    return (
      <Form onSubmit={ this.handleSubmit }>
        <Form.TextArea value={ this.state.content }
                       onChange={ this.handleChange } />
        <Button fluid primary labelPosition='right' icon='edit'
                content='Add Comment' />
      </Form>
    );
  }
}

export default NewMessageForm;
