import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import Home from './components/Home';
import Private from './components/Private';
// import LoginForm from './components/LoginForm';
import LogoutLink from './components/LogoutLink';
import NotFound from './components/NotFound';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
      Welcome!{" "}
      <button
      onClick={() => {
        fakeAuth.signout(() => history.push("/"));
      }}
      >
      Sign out
          </button>
        </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={ props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={ {
              pathname: "/login",
              state: { from: props.location }
          } }
        />
      )
    }
  />
);

class Login extends Component {
  state = {
    redirectToReferrer: false
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={ from } />;
    }

    return (
      <div>
        <p>You must log in to view the page at { from.pathname }</p>
        <button onClick={ this.login }>Log in</button>
      </div>
    );
  }
}

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
    </Router>;
  }
}

export default App;
