import {
  CHOOSE_DAILY_SCRUM_DATE,
  INVALIDATE_DAILY_SCRUM,
  REQUEST_DAILY_SCRUM,
  RECEIVE_DAILY_SCRUM
} from '../actions/DailyActions';

import {
  ADD_TASK_SUCCEED,
} from '../constants/TaskConstants'

export function selectedDate(state=Date.now(), action) {
  switch(action.type) {
  case CHOOSE_DAILY_SCRUM_DATE:
    return action.date;
  default:
    return state;
  }
}

const initialState = {
  isFetching: false,
  isInvalidated: false,
  today: {},
};

export function scrum(
  state=initialState,
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
      });
    case ADD_TASK_SUCCEED: {
      const { task } = action;
      const { rotation } = task;
      const { today } = state;
      const user = today.users.find(user => user.id === rotation.user_id);
      const _rotation = user.rotations.find(rttn => rttn.type === rotation.type);
      const _tasks = [..._rotation.tasks, task];
      const _rotations = user.rotations.map(rttn => {
        if (rttn.type === _rotation.type) {
          return {
            ..._rotation,
            tasks: _tasks,
          };
        } else {
          return rttn;
        }
      });
      const _user = {
        ...user,
        rotations: _rotations,
      };
      const _users = today.users.map(u => {
        if (u.id === _user.id) {
          return _user;
        } else {
          return u;
        }
      });
      const _today = {
        ...today,
        users: _users,
      };

      return {
        ...state,
        today: _today,
      };
    }
    default:
      return state;
  }
}
