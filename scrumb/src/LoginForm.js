import React from 'react';
import axios from 'axios';
import Functions from './Functions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/users/sign_in.json', {
      user: {
        email: this.state.email,
        password: this.state.password
      },
      authenticity_token: Functions.getMetaContent("csrf-token")
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  getMetaContent(name) {
    var metas = document.getElementsByTagName('meta');

    for (var i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("name") == name) {
        return metas[i].getAttribute("content");
      }
    }

    return "";
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <label>
          Email:
          <input type="email"
                 name="email"
                 placeholder="email"
                 value={ this.state.email }
                 onChange={ this.handleChange } />
        </label>
        <label>
          Password:
          <input type="password"
                 name="password"
                 placeholder="password"
                 value={ this.state.password }
                 onChange={ this.handleChange } />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default LoginForm;
