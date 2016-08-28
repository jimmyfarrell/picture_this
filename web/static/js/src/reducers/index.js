import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

//import posts from './posts';
//import comments from './comments';
import table from './table';

const rootReducer = combineReducers({
  //posts,
  //comments,
  table,
  routing: routerReducer
});

export default rootReducer;
