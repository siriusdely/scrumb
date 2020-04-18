import {
  CHOOSE_DAILY_SCRUM_DATE,
  INVALIDATE_DAILY_SCRUM,
  REQUEST_DAILY_SCRUM,
  RECEIVE_DAILY_SCRUM
} from '../actions/DailyActions';

export function selectedDate(state=Date.now(), action) {
  switch(action.type) {
  case CHOOSE_DAILY_SCRUM_DATE:
    return action.date;
  default:
    return state;
  }
}

const initialState = {
  isFetching: false,
  isInvalidated: false,
  tasks: {},
  today: {
    users: [],
  },
};

export function scrum(
  state=initialState,
  action
) {
  switch(action.type) {
    case INVALIDATE_DAILY_SCRUM:
      return Object.assign({}, state, {
        isInvalidated: true
      });
    case REQUEST_DAILY_SCRUM:
      return Object.assign({}, state, {
        isFetching: true,
        isInvalidated: false
      });
    case RECEIVE_DAILY_SCRUM: {
      const users = action.today.users;
      return Object.assign({}, state, {
        isFetching: false,
        isInvalidated: false,
        today: action.today
      });
    }
    default:
      return state;
  }
}
