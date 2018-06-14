import React from 'react';
import { withRouter } from 'react-router-dom';
import Auth from '../services/AuthService';
import AuthStore from '../stores/AuthStore';

const AuthButton = withRouter(
  ({ history }) =>
    // Auth.isAuthenticated ? (
    AuthStore.isLoggedIn() ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
              // Auth.signout(() => history.push("/"));
              Auth.logout();
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

export default AuthButton;
