import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore } from 'redux';

import rootReducer from './reducers';

const defaultState = {
  messages: [],
  game: {
    code: '',
    in_progress: false,
    player: localStorage.getItem('player') || '',
    socket: {}
  }
};

const store =
  createStore(
    defaultState,
    rootReducer,
    window.devToolsExtension && window.devToolsExtension()
  );

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
