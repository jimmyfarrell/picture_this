import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers';

const defaultState = {
  gameId: '',
  table: {
    cards: 0
  }
};

const store =
  createStore(
    rootReducer,
    defaultState,
    window.devToolsExtension && window.devToolsExtension()
  );

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
