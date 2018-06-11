import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import AuthButton from './components/AuthButton';
import Home from './components/Home';
import Login from './components/Login';
// import LoginForm from './components/LoginForm';
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
        <ul>
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <Link to="signup">Signup</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="dashboard">Dashboard</Link>
          </li>
          <li>
            <a href="#logout" onClick={ this.logout }>Logout</a>
          </li>
        </ul>
      )
    );
  }

  render() {
    var router = (
      <Router>
        <div>
          { this.headerItems }
          <AuthButton />
          <ul>
            <li>
              <Link to="/public">Public Home Page</Link>
            </li>
            <li>
              <Link to="/dashboard">Private Dashboard</Link>
            </li>
          </ul>
          <Switch>
            <Route path='/' exact component={ Home } />
            <Route path='/public' exact component={ Home } />
            <Route path='/login' exact component={ Login } />
            <Route path='/logout' exact component={ LogoutLink } />
            <PrivateRoute path='/dashboard' exact component={ Private } />
            <Route component={ NotFound } />
          </Switch>
        </div>
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
