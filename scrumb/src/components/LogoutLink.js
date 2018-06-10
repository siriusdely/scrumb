import React from 'react';
import axios from 'axios';
import AuthActions from '../actions/AuthActions';

class LogoutLink extends React.Component {
  logout() {
    axios.delete('/users/sign_out.json', {
      authenticity_token: AuthActions.getMetaContent("csrf-token")
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return(
        <a href="#logout" onClick={ this.logout }>Logout</a>
    );
  }
}

export default LogoutLink;
