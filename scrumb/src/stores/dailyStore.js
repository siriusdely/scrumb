import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import dailyReducers from '../reducers/dailyReducers';

const loggerMiddleware = createLogger();

const dailyStore = createStore(
  dailyReducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

export default dailyStore;
