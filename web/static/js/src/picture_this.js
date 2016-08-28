import React from 'react';
import { render } from 'react-dom';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

// Import Components
import App from './components/App';
import Home from './components/Home';
import Game from './components/Game';

const router = (
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Home }></IndexRoute>
        <Route path="/game/:code" component={ Game }></Route>
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
