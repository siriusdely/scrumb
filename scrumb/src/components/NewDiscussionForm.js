import React from 'react';
import { DISCUSSIONS_URL } from '../constants/ChatConstants';
import AuthStore from '../stores/AuthStore';

export default class NewDiscussionForm extends React.Component {
  state = {
    topic: ''
  }

  handleChange = (e) => {
    this.setState({ topic: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(DISCUSSIONS_URL, {
      method: 'POST',
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    });
    this.setState({ topic: '' });
  }

  render = () => {
    return (
      <div className='new-discussion-form'>
        <form onSubmit={ this.handleSubmit }>
          <label>New Discussion</label>
          <br />
          <input
            type='text'
            value={ this.state.topic }
            onChange={ this.handleChange }
          />
          <input type='submit' />
        </form>
      </div>
    );
  }
}
