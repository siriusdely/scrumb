import React from 'react';
import { Input } from 'semantic-ui-react';

import { DISCUSSIONS_URL } from '../constants/ChatConstants';
import AuthStore from '../stores/AuthStore';

export default class NewDiscussionForm extends React.Component {
  state = {
    topic: ''
  }

  handleChange = (e) => {
    this.setState({ topic: e.target.value });
  }

  handleKeyDown(e) {
    if (e.which === 13) { // ENTER_KEY
      this.handleSubmit(e);
    }
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
      <Input fluid type='text'
             action={ {
                 color: 'teal',
                 icon: 'check',
             } }
             placeholder='New Discussion...'
             value={ this.state.topic }
             onChange={ this.handleChange }
             onKeyDown={ this.handleKeyDown.bind(this) }
      />
    );
  }
}
