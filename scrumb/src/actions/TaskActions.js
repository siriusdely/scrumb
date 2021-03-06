import axios from 'axios';

import AuthStore from '../stores/AuthStore';

/**
 *  ACTION TYPES
 */

import {
  SCRUMS_URL,
  TASKS_URL,
  ADD_TASK_SUCCEED,
  UPDATE_TASK_SUCCEED,
  DELETE_TASK_SUCCEED,
  TOGGLE_TASK_SUCCEED,
} from '../constants/TaskConstants'


/**
 * ACTION CREATORS
 */

function addTaskSucceed(task) {
  return {
    type: ADD_TASK_SUCCEED,
    task,
  };
}

export function addTask(task) {
  return function(dispatch) {
    axios.post(`${SCRUMS_URL}/${task.scrum_id}/tasks`, task, {
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      // console.log('addTask response', task, response);
      dispatch(addTaskSucceed(response.data));
    }).catch(function(error) {
      // console.error('addTask ERR', task, error);
    });
  }
}

function deleteTaskSucceed(task) {
  return {
    type: DELETE_TASK_SUCCEED,
    task,
  };
}

export function deleteTask(task) {
  return function(dispatch) {
    axios({
      data: task,
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      url: `${TASKS_URL}/${task.id}`,
    }).then(function(response) {
      console.log('deleteTask response', task, response);
      dispatch(deleteTaskSucceed(task));
    }).catch(function(error) {
      console.error('deleteTask ERR', task, error);
    });
  };
}

function updateTaskSucceed(task) {
  return {
    type: UPDATE_TASK_SUCCEED,
    task,
  }
}

export function updateTask(task) {
  return function(dispatch) {
    axios.put(`${TASKS_URL}/${task.id}`, task, {
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      // console.log('updateTask response', task, response);
      dispatch(updateTaskSucceed(response.data));
    }).catch(function(error) {
      // console.error('updateTask ERR', task, error);
    });
  }
}

function toggleTaskSucceed(task) {
  return {
    type: TOGGLE_TASK_SUCCEED,
    task,
  };
}

export function toggleTask(id) {
  // console.log('toggleTask id', id);
  return function(dispatch) {
    axios.put(`${TASKS_URL}/${id}/toggle`, null, {
      headers: {
        Authorization: AuthStore.jwt,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      // console.log('toggleTask id response', id, response);
      dispatch(toggleTaskSucceed(response.data));
    }).catch(function(error) {
      // console.error('toggleTask id ERR', id, error);
    });
  };
}
