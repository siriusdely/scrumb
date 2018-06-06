import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import LoginForm from './LoginForm';
import LogoutLink from './LogoutLink';
import NotFound from './NotFound';

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
    return <Router>
      <Switch>
        <Route path='/' exact component={ Home } />
        <Route path='/login' exact component={ LoginForm } />
        <Route path='/logout' exact component={ LogoutLink } />
        <Route component={ NotFound } />
      </Switch>
    </Router>;
  }
}

export default App;
