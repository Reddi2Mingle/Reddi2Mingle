import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App';
import Signup from './components/Signup';
import Login from './components/Login';
import PotentialContainer from './containers/PotentialContainer';
import MatchesContainer from './containers/MatchesContainer';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/potential" component={PotentialContainer} />
    <Route path="/matches" component={MatchesContainer} />
  </Router>
);
