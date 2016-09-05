import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import game from './game';
import messages from './messages';

const rootReducer = combineReducers({
  game,
  messages,
  routing: routerReducer
});

export default rootReducer;
