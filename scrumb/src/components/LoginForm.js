import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  Header
} from 'semantic-ui-react';

// import axios from 'axios';

// import AuthActions from '../actions/AuthActions';
import Auth from '../services/AuthService';
import AuthStore from '../stores/AuthStore';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: AuthStore.isLoggedIn()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _handleAuth() {
    this.setState({
      redirect: AuthStore.isLoggedIn()
    });
  }

  componentDidMount() {
    this.handleAuth = this._handleAuth.bind(this);
    AuthStore.addChangeListener(this.handleAuth);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.handleAuth);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // axios.post('/users/sign_in.json', {
    //   user: {
    //     email: this.state.email,
    //     password: this.state.password
    //   },
    //   authenticity_token: AuthActions.getMetaContent("csrf-token")
    // }).then(function(response) {
    //   console.log(response);
    // }).catch(function(error) {
    //   console.log(error);
    // });
    Auth.login(this.state.email, this.state.password);
  }

  getMetaContent(name) {
    var metas = document.getElementsByTagName('meta');
    for (var i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("name") === name) {
        return metas[i].getAttribute("content");
      }
    }
    return "";
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={ from } />;
    }

    return (
      <Container text>
        <Header as='h3' textAlign='center' color='teal'>
          <Header.Content>
            { from && from.pathname && from.pathname !== '/'
              ? `You must log in to view page at ${from.pathname}`
              : 'Login' }
          </Header.Content>
        </Header>
        <Container>
          <Form onSubmit={ this.handleSubmit }>
            <Form.Field>
              <label>
                Email:
                <input type="email"
                       name="email"
                       placeholder="email"
                       value={ this.state.email }
                       onChange={ this.handleChange } />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Password:
                <input type="password"
                       name="password"
                       placeholder="password"
                       value={ this.state.password }
                       onChange={ this.handleChange } />
              </label>
            </Form.Field>
            <Button type="submit" color="teal">Login</Button>
          </Form>
        </Container>
      </Container>
    );
  }
}

export default LoginForm;
