import { LOGIN_URL } from '../constants/AuthConstants';
import AuthActions from '../actions/AuthActions';

class AuthService {
  isAuthenticated = false;

  authenticate(cb) {
    this.login("asdf@asdf.asdf", "asdfasdf")
      .then((response) => {
        console.log(response);
        console.log(response.auth_token);
        AuthActions.loginUser(response['auth_token']);
      });
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  }

  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }

  login(email, password) {
    return window
      .fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({
          'email': email,
          'password': password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      // .then(json => console.log(json))
      .catch(error => console.log(error));
  }

  logout() {
    AuthActions.logoutUser();
  }

  fetch(endpoint) {
    return window
      .fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
       // .then(json => console.log(json))
      .catch(error => console.log(error));
  }
}

export default new AuthService();
