import { USER_LOGIN, USER_LOGOUT } from '../constants/AuthConstants';
import BaseStore from './BaseStore';

class AuthStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    try {
      this._jwt = localStorage ? localStorage.getItem('jwt') : null;
    } catch(e) {
      console.error(e);
    }
  }

  _registerToActions(action) {
    switch(action.actionType) {
    case USER_LOGIN:
      this._jwt = action.jwt;
      this.emitChange();
      break;
    case USER_LOGOUT:
      this._jwt = null;
      this.emitChange();
      break;
    default:
      break;
    }
  }

  get jwt() {
    return this._jwt;
  }

  set jwt(jwt) {
    localStorage.setItem('jwt', jwt);
    this._jwt = jwt;
    this.emitChange();
  }

  isLoggedIn() {
    return !!this._jwt;
  }
}

export default new AuthStore();
