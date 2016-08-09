import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Signup from './components/Signup';
import Login from './components/Login';
import MatchMaker from './components/Matchmaker';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/matchMaker" component={MatchMaker} />
  </Router>
);
