import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from './stateless/App';
import Signup from './stateless/Signup';
import Login from './stateless/Login';
import PotentialContainer from './potential/PotentialContainer';
import MatchesContainer from './matches/MatchesContainer';
import UserContainer from './user/UserContainer';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/potential" component={PotentialContainer} />
    <Route path="/matches" component={MatchesContainer} />
    <Route path="/profile" component={UserContainer} />
  </Router>
);
