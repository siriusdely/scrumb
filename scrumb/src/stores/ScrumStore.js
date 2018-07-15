import { USER_LOGOUT } from '../constants/AuthConstants';
import { GET_SCRUMS, GET_SCRUM, GOT_TODAY,
       INVALIDATE_TODAY } from '../constants/ScrumConstants';
import BaseStore from './BaseStore';

class ScrumStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._subscribeToActions.bind(this));
    this._scrums = [];
    this._scrum = null;
    this._today = null;
  }

  _subscribeToActions(action) {
    switch(action.actionType) {
    case GET_SCRUMS:
      this._scrums = action.scrums;
      this.emitChange();
      break;
    case GET_SCRUM:
      this._scrum = action.scrum;
      this.emitChange();
      break;
    case GOT_TODAY:
      this._today = action.today;
      this.emitChange();
      break;
    case INVALIDATE_TODAY:
      this._today = action.today;
      this.emitChange();
      break;
    case USER_LOGOUT:
      this._scrums = [];
      this.emitChange();
      break;
    default:
      break;
    }
  }

  get scrums() {
    return this._scrums;
  }

  get scrum() {
    return this._scrum;
  }

  get today() {
    return this._today;
  }
}

export default new ScrumStore();
