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

import DailyScrumRoot from './containers/DailyScrumRoot';
import DiscussionsPage from './components/DiscussionsPage';
import LoginPage from './components/LoginPage';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import PublicPage from './components/PublicPage';
import RegisterPage from './components/RegisterPage';
import ScrumsPage from './components/ScrumsPage';

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
            <NavLink key="scrums" className="item teal" to="/scrums">Scrums</NavLink>,
            <NavLink key="discussions" className="item teal" exact to="/discussions">Discussions</NavLink>
        ] : null }
        <Menu.Menu position="right">
          { !isSignedIn ? [
              <NavLink key="login" className="item" exact to="/login">Login</NavLink>,
              <NavLink key="register" className="item" exact to="/register">Register</NavLink>
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
            <Route path='/' exact component={ this.state.isSignedIn ? ScrumsPage : PublicPage } />
            <PrivateRoute path='/discussions' exact component={ DiscussionsPage } />
            <PrivateRoute path='/scrums' exact component={ ScrumsPage } />
            <Route path='/login' exact component={ LoginPage } />
            <Route path='/register' exact component={ RegisterPage } />
            <PrivateRoute path='/scrums/:scrumId' exact component={ DailyScrumRoot } />
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
