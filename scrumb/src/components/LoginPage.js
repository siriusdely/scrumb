import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Input
} from 'semantic-ui-react';

import Auth from '../services/AuthService';
import AuthStore from '../stores/AuthStore';

class LoginPage extends React.Component {
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
    Auth.login(this.state.email, this.state.password);
  }

  /*
  getMetaContent(name) {
    var metas = document.getElementsByTagName('meta');
    for (var i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("name") === name) {
        return metas[i].getAttribute("content");
      }
    }
    return "";
  }
  */

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={ from } />;
    }

    return (
      <Container text>
        <Header as='h2' textAlign='center' color='teal'>
          <Header.Content>
            { from && from.pathname && from.pathname !== '/'
              ? `You must log in to view page at ${from.pathname}`
              : 'Login' }
          </Header.Content>
        </Header>
        <Divider hidden section />
        <Form onSubmit={ this.handleSubmit }>
          <Grid>
            <Grid.Row>
              <Grid.Column width="4" verticalAlign="middle">
                <Header as="h3" content="Email:" />
              </Grid.Column>
              <Grid.Column width="12">
                <Input fluid required
                       size="big"
                       type="email"
                       name="email"
                       placeholder="email"
                       value={ this.state.email }
                       onChange={ this.handleChange } />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width="4" verticalAlign="middle">
                <Header as="h3" content="Password:" />
              </Grid.Column>
              <Grid.Column width="12">
                <Input fluid required
                       size="big"
                       type="password"
                       name="password"
                       placeholder="password"
                       value={ this.state.password }
                       onChange={ this.handleChange } />
              </Grid.Column>
            </Grid.Row>
            <Divider hidden />
            <Grid.Row centered>
              <Grid.Column width="8">
                <Button size="big" fluid type="submit" color="teal">Login</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
    );
  }
}

export default LoginPage;
