import React from 'react';
import axios from 'axios';
import Functions from './Functions';

class LogoutLink extends React.Component {
  logout() {
    axios.delete('/users/sign_out.json', {
      authenticity_token: Functions.getMetaContent("csrf-token")
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return(
        <a href="#" onClick={ this.logout }>Logout</a>
    );
  }
}

export default LogoutLink;
