import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import messages from './messages';
import socket from './socket';
import game from './game';

const rootReducer = combineReducers({
  game,
  messages,
  socket,
  routing: routerReducer
});

export default rootReducer;
