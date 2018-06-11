import { USER_LOGIN, USER_LOGOUT } from '../constants/AuthConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';
// import RouterContainer from '../services/RouterContainer';

export default {
  getMetaContent: function(name) {
    var metas = document.getElementsByTagName('meta');

    for (var i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("name") === name) {
        return metas[i].getAttribute("content");
      }
    }

    return "";
  },

  loginUser: (jwt) => {
    var savedJwt = localStorage.getItem('jwt');

    AppDispatcher.dispatch({
      actionType: USER_LOGIN,
      jwt: jwt
    });

    if (savedJwt !== jwt) {
      // var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';
      // RouterContainer.get().transitionTo(nextPath);
      localStorage.setItem('jwt', jwt);
    }
  },

  logoutUser: () => {
    // RouterContainer.get().transitionTo('/login');
    localStorage.removeItem('jwt');
    AppDispatcher.dispatch({
      actionType: USER_LOGOUT
    });
  }
}
