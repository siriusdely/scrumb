import { LOGIN_URL, REGISTER_URL } from '../constants/AuthConstants';
import AuthActions from '../actions/AuthActions';

class AuthService {
  /*
  isAuthenticated = false;
  signin(cb) {
    this.login("asdf@asdf.asdf", "asdfasdf")
      .then((response) => {
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
  */
  login(email, password) {
    return this.post(LOGIN_URL, { email, password })
      .then(response => response.json())
      .then(json => {
        // console.log(json);
        AuthActions.loginUser(json['auth_token']);
      }).catch(error => console.log(error));
  }

  logout() {
    AuthActions.logoutUser();
  }

  register(firstName, lastName, email, password, passwordConfirmation) {
    console.log(firstName, lastName, email, password, passwordConfirmation);
    return this.post(REGISTER_URL, {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      password_confirmation: passwordConfirmation,
    })
      .then(response => response.json())
      .then(json => AuthActions.loginUser(json['auth_token']))
      .catch(error => console.log(error));
  }

  post(url, json) {
    return window
      .fetch(url, {
        body: JSON.stringify(json),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
  }
}

export default new AuthService();
