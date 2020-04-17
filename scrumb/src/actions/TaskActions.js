import axios from 'axios';

import AuthStore from '../stores/AuthStore';

/**
 *  ACTION TYPES
 */

import {
  TASKS_URL,
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK_SUCCEED,
} from '../constants/TaskConstants'


/**
 * ACTION CREATORS
 */

let nextTaskId = 0;
export function addTask(text) {
  return {
    type: ADD_TASK,
    id: nextTaskId++,
    text,
  };
}

export function deleteTask(id) {
  return {
    type: DELETE_TASK,
    id,
  };
}

export function toggleTaskSucceed(id) {
  return {
    type: TOGGLE_TASK_SUCCEED,
    id,
  };
}

export function toggleTask(id) {
  return function(dispatch) {
    axios.put(`${TASKS_URL}/${id}/toggle`, {
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      console.log('toggleTask ' + id, response);
      dispatch(toggleTaskSucceed(id));
    }).catch(function(error) {
      console.error('toggleTask ' + id, error);
    });
  };
}
