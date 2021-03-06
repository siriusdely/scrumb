import React from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../services/AuthService';
import AuthStore from '../stores/AuthStore';

export default class Login extends React.Component {
  state = {
    // redirectToReferrer: false
    redirectToReferrer: AuthStore.isLoggedIn()
  };

  login = () => {
    // Auth.authenticate(() => {
      // this.setState({ redirectToReferrer: true });
    // });
    Auth.authenticate();
    // Auth.login();
  };

  _onAuthChange() {
    this.setState({
      redirectToReferrer: AuthStore.isLoggedIn()
    })
  }

  componentDidMount() {
    this.onAuthChange = this._onAuthChange.bind(this);
    AuthStore.addChangeListener(this.onAuthChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onAuthChange);
  }
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
