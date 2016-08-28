import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';

//import comments from './data/comments';
//import posts from './data/posts';

// create an object for the default data
const defaultState = {
  table: {
    cards: 0
  }
  //posts,
  //comments
};

const store =
  createStore(
    rootReducer,
    defaultState,
    window.devToolsExtension && window.devToolsExtension()
  );

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
