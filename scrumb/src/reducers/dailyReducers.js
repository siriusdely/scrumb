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

export function scrum(
  state={
    isFetching: false,
    isInvalidated: false,
    today: {}
  },
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
  case RECEIVE_DAILY_SCRUM:
    return Object.assign({}, state, {
      isFetching: false,
      isInvalidated: false,
      today: action.today
    })
  default:
    return state;
  }
}
