import React from 'react';
import { TOPICS_URL } from '../constants/ChatConstants';
import AuthStore from '../stores/AuthStore';

export default class NewTopicForm extends React.Component {
  state = {
    title: ''
  }

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(TOPICS_URL, {
      method: 'POST',
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    });
    this.setState({ title: '' });
  }

  render = () => {
    return (
      <div className='new-topic-form'>
        <form onSubmit={ this.handleSubmit }>
          <label>New Topic</label>
          <br />
          <input
            type='text'
            value={ this.state.title }
            onChange={ this.handleChange }
          />
          <input type='submit' />
        </form>
      </div>
    );
  }
}
