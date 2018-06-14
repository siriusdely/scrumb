import React, { Component } from 'react';
import { MESSAGES_URL } from '../constants/ChatConstants';
import AuthStore from '../stores/AuthStore';

class NewMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      topic_id: props.topicId
    }
  }

  componentWillReceiveProps = newProps => {
    this.setState({
      topic_id: newProps.topicId
    });
  }

  handleChange = e => {
    this.setState({
      content: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    fetch(MESSAGES_URL, {
      method: 'POST',
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    });
    this.setState({ content: '' });
  }

  render = () => {
    return (
      <div className="new-message-form">
        <form onSubmit={ this.handleSubmit }>
          <label>New Message</label>
          <br />
          <input
            type='text'
            value={ this.state.content }
            onChange={ this.handleChange }
          />
          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default NewMessageForm;
