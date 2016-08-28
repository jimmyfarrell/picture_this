import React from 'react';

import { render } from 'react-dom';

// Import css
//import css from './styles/style.styl';

// Import Components
import Main from './components/Main';
import Card from './components/Card';
import TestTwo from './components/TestTwo';
//import Single from './components/Single';
//import PhotoGrid from './components/PhotoGrid';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}>
        <IndexRoute component={Card}></IndexRoute>
        <Route path="/view/:postId" component={TestTwo}></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
