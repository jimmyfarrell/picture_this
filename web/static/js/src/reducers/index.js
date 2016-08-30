import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import messages from './messages';
import table from './table';

const rootReducer = combineReducers({
  messages,
  table,
  routing: routerReducer
});

export default rootReducer;
