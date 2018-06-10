import { LOGIN_URL } from '../constants/AuthConstants';

class AuthService {
  isAuthenticated = false;

  authenticate(cb) {
    // this.login("asdf@asdf.asdf", "asdfasdf");
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
      .then(json => console.log(json))
      .catch(error => console.log(error));
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
