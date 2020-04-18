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

export function toggleTaskSucceed(task) {
  return {
    type: TOGGLE_TASK_SUCCEED,
    task,
  };
}

export function toggleTask(id) {
  console.log('toggleTask id', id);
  return function(dispatch) {
    axios.put(`${TASKS_URL}/${id}/toggle`, null, {
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      console.log('toggleTask id response', id, response);
      dispatch(toggleTaskSucceed(response.data));
    }).catch(function(error) {
      console.error('toggleTask id ERR', id, error);
    });
  };
}
