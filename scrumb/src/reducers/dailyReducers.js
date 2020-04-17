import { combineReducers } from 'redux';
import {
  CHOOSE_DAILY_SCRUM_DATE,
  INVALIDATE_DAILY_SCRUM,
  REQUEST_DAILY_SCRUM,
  RECEIVE_DAILY_SCRUM
} from '../actions/DailyActions';

function selectedDate(state=Date.now(), action) {
  switch(action.type) {
  case CHOOSE_DAILY_SCRUM_DATE:
    return action.date;
  default:
    return state;
  }
}

function scrum(
  state={
    isFetching: false,
    isInvalidated: false,
    scrum: {}
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
      scrum: action.scrum
    })
  default:
    return state;
  }
}

const dailyReducer = combineReducers({
  selectedDate,
  scrum
});

export default dailyReducer;
