import React from 'react';
import {
  Button
  , Container
  , Divider
  , Form
  , Header
  , Input
} from 'semantic-ui-react';

import AuthService from '../services/AuthService';

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      passwordConfirmation: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    AuthService.register(
      this.state.firstName
      , this.state.lastName
      , this.state.emailAddress
      , this.state.password
      , this.state.passwordConfirmation
    );
  }

  render() {
    return (
      <Container text>
        <Header as='h2' color='teal' textAlign='center'
                content='Register an Account' />
        <Divider hidden section />
        <Form onSubmit={ this.handleSubmit }>
          <Form.Group widths='equal'>
            <Form.Input required name='firstName'
                        value={ this.state.firstName } onChange={ this.handleChange }
                        label='First Name:' placeholder='First name' />
            <Form.Field required name='lastName'
                        value={ this.state.lastName } onChange={ this.handleChange }
                        label='Last Name:' placeholder='Last name' control={ Input } />
          </Form.Group>
          <Form.Field required name='emailAddress'
                      value={ this.state.emailAddress } onChange={ this.handleChange }
                      label='Email:' placeholder='Email address' control='input' type='email' />
          <Form.Group widths='equal'>
            <Form.Field required>
              <label>Password:</label>
              <input required name='password'
                     value={ this.state.password } onChange={ this.handleChange }
                     type='password' placeholder='Password' />
            </Form.Field>
            <Form.Input required name='passwordConfirmation'
                        value={ this.state.passwordConfirmation } onChange={ this.handleChange }
                        type='password' label='Password Confirmation:' placeholder='Confirmation' />
          </Form.Group>
          <Divider hidden />
          <Button fluid type='submit' color='teal' content='Register' />
        </Form>
      </Container>
    );
  }
}
