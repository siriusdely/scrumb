import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import Auth from '../services/AuthService';
import AuthStore from '../stores/AuthStore';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props =>
        // Auth.isAuthenticated ? (
        AuthStore.isLoggedIn() ? (
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

export default PrivateRoute;
