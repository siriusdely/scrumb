import {
  TOGGLE_TASK_SUCCEED,
} from '../constants/TaskConstants'

export function tasks(state=[], action) {
  switch(action.type) {
    case TOGGLE_TASK_SUCCEED:
      return state.map(
        task => (task.id === action.id) ?
        { ...task, state: state === 'finished' ? 'unstarted' : 'finished' }
        : task
      );
    default:
      return state;
  }
}
