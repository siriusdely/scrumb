import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Container,
  Divider,
  Menu
} from 'semantic-ui-react';

import ChatsPage from './components/MessagesPage';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import LogoutLink from './components/LogoutLink';
import NotFound from './components/NotFound';
import Private from './components/Private';
import PrivateRoute from './components/PrivateRoute';
import PublicPage from './components/PublicPage';
import Today from './components/Today';

import AuthService from './services/AuthService';
import AuthStore from './stores/AuthStore';
// import RouterContainer from './services/RouterContainer';

class App extends Component {
  constructor() {
    super();
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      isSignedIn: AuthStore.isLoggedIn()
    };
  }

  componentWillMount() {
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

  get navigationMenu() {
    let isSignedIn = this.state.isSignedIn;
    return (
      <Menu size="huge" stackable inverted={ !isSignedIn } color="teal">
        { /* <Menu.Item header color="teal">ScrumBy</Menu.Item> */ }
        <NavLink className="item header" exact to="/">ScrumBy</NavLink>
        { isSignedIn ? [
            <NavLink key="dashboard" className="item teal" exact to="/dashboard">Dashboard</NavLink>,
            <NavLink key="chats" className="item teal" exact to="/chats">Chats</NavLink>
        ] : null }
        <Menu.Menu position="right">
          { !isSignedIn ? [
              <NavLink key="login" className="item" exact to="/login">Login</NavLink>,
              <NavLink key="signup" className="item" exact to="/signup">Signup</NavLink>
          ] : <a className="item" href="#logout" onClick={ this.logout }>Logout</a> }
        </Menu.Menu>
      </Menu>
    );
  }

  render() {
    var router = (
      <Router>
        <Container>
          <Divider hidden />
          { this.navigationMenu }
          <Divider hidden section />
          <Switch>
            <Route path='/' exact component={ this.state.isSignedIn ? Today : PublicPage } />
            <Route path='/chats' exact component={ ChatsPage } />
            <Route path='/login' exact component={ LoginPage } />
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
}

export default App;
