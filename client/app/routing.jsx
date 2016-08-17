import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from './stateless/Signup';
import Login from './stateless/Login';
import MatchMakerContainer from './potential/MatchMakerContainer';
import MatchesContainer from './matches/MatchesContainer';
import PhotoUploadContainer from './user/photoUpload/PhotoUploadContainer';
import requireAuthorization from './auth/RequireAuthorization';
import CreatePassword from './auth/CreatePassword';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={requireAuthorization(MatchMakerContainer)} />
    <Route path="/signup" component={Signup} />
    <Route path="/createPassword" component={requireAuthorization(CreatePassword)} />
    <Route path="/login" component={Login} />
    <Route path="/matches" component={requireAuthorization(MatchesContainer)} />
    <Route path="/photoUpload" component={PhotoUploadContainer} />
  </Router>
);
