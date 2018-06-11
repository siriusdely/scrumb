import { USER_LOGIN, USER_LOGOUT } from '../constants/AuthConstants';
import BaseStore from '../stores/BaseStore';

class AuthStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._jwt = localStorage.getItem('jwt');
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

  isLoggedIn() {
    return !!this._jwt;
  }
}

export default new AuthStore();
