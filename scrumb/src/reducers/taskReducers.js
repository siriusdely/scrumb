import {
  ADD_TASK_SUCCEED,
  DELETE_TASK_SUCCEED,
  TOGGLE_TASK_SUCCEED,
  UPDATE_TASK_SUCCEED,
} from '../constants/TaskConstants'

import {
  RECEIVE_DAILY_SCRUM,
} from '../actions/DailyActions';

export function tasks(state={}, action) {
  switch(action.type) {
    case RECEIVE_DAILY_SCRUM: {
      const users = action.today.users;
      return users.reduce((rotations, user) => (
        rotations.concat(user.rotations)
      ), [])
        .reduce((tasks, rotation) => tasks.concat(rotation.tasks), [])
        .reduce((tasks, task) => {
          tasks[task.id] = task
          return tasks;
        }, state);
    }
    case ADD_TASK_SUCCEED: {
      const task = {
        ...action.task,
      };

      return {
        ...state,
        [task.id]: task,
      };
    }
    case DELETE_TASK_SUCCEED: {
      const { task } = action;
      const _state = { ...state };
      delete _state[task.id];

      return _state;
    }
    case UPDATE_TASK_SUCCEED: {
      const _task = state[action.task.id];
      const task = {
        ..._task,
        ...action.task,
      };

      return {
        ...state,
        [task.id]: task,
      };
    }
    case TOGGLE_TASK_SUCCEED: {
      // console.log('taskReducers tasks actions', action);
      const _task = state[action.task.id];
      // console.log('taskReducers tasks TOGGLE_TASK_SUCCEED _task', _task);
      const task = {
        ..._task,
        ...action.task,
      };
      // console.log('taskReducers tasks TOGGLE_TASK_SUCCEED task', task);

      return {
        ...state,
        [task.id]: task,
      };
    }
    default:
      return state;
  }
}
