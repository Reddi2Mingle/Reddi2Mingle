import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Store from './AppStore.js';
import App from './App.js';
import WelcomeView from './auth/WelcomeView';
import MatchmakerView from './matches/Matchmaker';
import MatchedView from './matches/Matched';
import ProfileView from './profile/Profile';

ReactDOM.render(
  <Provider store={Store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={WelcomeView}/>
        <Route path='/matchmaker' component={MatchmakerView}/>
        <Route path='/matched' component={MatchedView} />
        <Route path='/profile' component={ProfileView}/>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app'));
