import axios from 'axios';

import { SCRUMS_URL } from '../constants/ScrumConstants';
import AuthStore from '../stores/AuthStore';

export const CHOOSE_DAILY_SCRUM_DATE = 'CHOOSE_DAILY_SCRUM_DATE';

export function chooseDailyScrumDate(date) {
  return {
    type: CHOOSE_DAILY_SCRUM_DATE,
    date
  };
};

export const INVALIDATE_DAILY_SCRUM = 'INVALIDATE_DAILY_SCRUM';

export function invalidateDailyScrum(date) {
  return {
    type: INVALIDATE_DAILY_SCRUM,
    date
  };
};

export const REQUEST_DAILY_SCRUM = 'REQUEST_DAILY_SCRUM';

export function requestDailyScrum(date) {
  return {
    type: REQUEST_DAILY_SCRUM,
    date
  };
};

export const RECEIVE_DAILY_SCRUM = 'RECEIVE_DAILY_SCRUM';

export function receiveDailyScrum(date, json) {
  return {
    type: RECEIVE_DAILY_SCRUM,
    date,
    today: json.data,
  };
};

export const RECEIVE_DAILY_SCRUM_ERROR = 'RECEIVE_DAILY_SCRUM_ERROR';

export function receiveDailyScrumError(date, error) {
  return {
    type: RECEIVE_DAILY_SCRUM_ERROR,
    date,
    error
  };
}

export function fetchToday(date) {
  return function(dispatch) {
    dispatch(requestDailyScrum(date));

    axios({
      method: 'GET',
      url: `${SCRUMS_URL}/${1}/today`,
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      // console.log(JSON.stringify(response.data));
      dispatch(receiveDailyScrum(date, response.data));
    }).catch(function(error) {
      console.error(error);
    });
  };
}
