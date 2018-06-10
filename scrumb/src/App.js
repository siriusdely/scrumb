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

import RouterContainer from './services/RouterContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.isSignedIn = this.isSignedIn.bind(this);
  }

  componentWillMount() {
    this.isSignedIn();
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
                 .then(response => response.json())
                 .catch(error => console.log(error));
  }

  isSignedIn() {
    this.fetch('/auth/is_signed_in')
        .then(response => {
          this.setState({ signedIn: response.signed_in });
          console.log(this.state);
        });
  }

  render() {
    var router = (
      <Router>
        <div>
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

    RouterContainer.set(router);
    return router;
  }
}

export default App;
