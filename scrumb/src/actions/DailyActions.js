import axios from 'axios';

import { SCRUMS_URL } from '../constants/ScrumConstants';
import AuthStore from '../stores/AuthStore';

export const CHOOSE_DAILY_SCRUM_DATE = 'CHOOSE_DAILY_SCRUM_DATE';

export function chooseDailyScrumDate(date) {
  return {
    type: CHOOSE_DAILY_SCRUM_DATE,
    date
  };
}

export const INVALIDATE_DAILY_SCRUM = 'INVALIDATE_DAILY_SCRUM';

export function invalidateDailyScrum(date) {
  return {
    type: INVALIDATE_DAILY_SCRUM,
    date
  };
}

export const REQUEST_DAILY_SCRUM = 'REQUEST_DAILY_SCRUM';

export function requestDailyScrum(date) {
  return {
    type: REQUEST_DAILY_SCRUM,
    date
  };
}

export const RECEIVE_DAILY_SCRUM = 'RECEIVE_DAILY_SCRUM';

export function receiveDailyScrum(date, today) {
  return {
    type: RECEIVE_DAILY_SCRUM,
    date,
    today,
  };
}

export const RECEIVE_DAILY_SCRUM_ERROR = 'RECEIVE_DAILY_SCRUM_ERROR';

export function receiveDailyScrumError(date, error) {
  return {
    type: RECEIVE_DAILY_SCRUM_ERROR,
    date,
    error
  };
}

export function fetchToday(scrumId, date) {
  return function(dispatch) {
    dispatch(requestDailyScrum(scrumId, date));

    axios({
      method: 'GET',
      url: `${SCRUMS_URL}/${scrumId}/today`,
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      // console.log('DailyActions fetchToday response', response.data);
      dispatch(receiveDailyScrum(date, response.data));
    }).catch(function(error) {
      console.error('DailyActions fetchToday ERR', error);
      const response = error.response;
      // console.error(`DailyActions fetchToday ERR ${ response.statusText } (${ response.status}): ${ response.data.message }`);
      if (response.status === 401 ||
        response.status === 422) {
        AuthStore.jwt = null;
      }
    });
  };
}
