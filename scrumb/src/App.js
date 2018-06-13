import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Container,
  Divider,
  Menu
} from 'semantic-ui-react';

// import AuthButton from './components/AuthButton';
import ChatsPage from './components/ChatsPage';
import Home from './components/Home';
// import Login from './components/Login';
import LoginForm from './components/LoginForm';
import LogoutLink from './components/LogoutLink';
import NotFound from './components/NotFound';
import Private from './components/Private';
import PrivateRoute from './components/PrivateRoute';

import AuthService from './services/AuthService';
import AuthStore from './stores/AuthStore';
// import RouterContainer from './services/RouterContainer';

class App extends Component {
  constructor() {
    super();
    // this.state = {};
    // this.isSignedIn = this.isSignedIn.bind(this);
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      isSignedIn: AuthStore.isLoggedIn()
    };
  }

  componentWillMount() {
    // this.isSignedIn();
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    AuthStore.addChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.changeListener);
  }

  logout(e) {
    e.preventDefault();
    AuthService.logout();
  }

  get headerItems() {
    return (
      !this.state.isSignedIn ? (
          <Menu size="large">
            <Menu.Item header>SCRUMBY</Menu.Item>
            <Link className="item active" to="/">Home</Link>
            <Menu.Menu position="right">
              <Link className="item" to="login">Login</Link>
              <Link className="item" to="signup">Signup</Link>
            </Menu.Menu>
          </Menu>
        ) : (
          <Menu size="large">
            <Menu.Item header>SCRUMBY</Menu.Item>
            <Link className="item active" to="/">Home</Link>
            <Link className="item" to="dashboard">Dashboard</Link>
            <Link className="item" to="chats">Chats</Link>
            <Menu.Menu position="right">
              <a className="item" href="#logout" onClick={ this.logout }>Logout</a>
            </Menu.Menu>
          </Menu>
        )
    );
  }

  render() {
    var router = (
      <Router>
        <Container>
          <Divider hidden />
          { this.headerItems }
          <Divider hidden section />
          <Switch>
            <Route path='/' exact component={ Home } />
            <Route path='/chats' exact component={ ChatsPage} />
            <Route path='/login' exact component={ LoginForm } />
            <Route path='/logout' exact component={ LogoutLink } />
            <Route path='/public' exact component={ Home } />
            <PrivateRoute path='/dashboard' exact component={ Private } />
            <Route component={ NotFound } />
          </Switch>
          <Divider hidden section />
        </Container>
      </Router>
    );

    // RouterContainer.set(router);

    return (
      router
    );
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
                 .then(response => response.json())
                 .catch(error => console.log(error));
  }

  isSignedIn() {
    this.fetch('/auth/is_signed_in')
        .then(response => {
          this.setState({ isSignedIn: response.signed_in });
          console.log(this.state);
        });
  }

}

export default App;
