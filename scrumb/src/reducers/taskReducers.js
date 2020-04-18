import {
  TOGGLE_TASK_SUCCEED,
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
    case TOGGLE_TASK_SUCCEED: {
      // console.log('taskReducers tasks actions', action);
      const _task = state[action.id];
      // console.log('taskReducers tasks TOGGLE_TASK_SUCCEED _task', _task);
      const task = {
        ..._task,
        state: _task.state === 'finished' ? 'unstarted' : 'finished'
      };
      // console.log('taskReducers tasks TOGGLE_TASK_SUCCEED task', task);

      return {
        ...state,
        [action.id]: task,
      };
    }
    default:
      return state;
  }
}
