import { combineReducers } from 'redux';

import {
  scrum,
  selectedDate,
} from './dailyReducers'

import {
  tasks,
} from './taskReducers';

const combinedReducers = combineReducers({
  scrum,
  selectedDate,
  tasks,
});

export default combinedReducers;
