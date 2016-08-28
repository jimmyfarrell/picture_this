import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import gameId from './game_id';
import table from './table';

const rootReducer = combineReducers({
  gameId,
  table,
  routing: routerReducer
});

export default rootReducer;
