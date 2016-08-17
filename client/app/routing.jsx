import React from 'react';
import { Router, Route, browserHistory } from 'react-router';


import App from './stateless/App';
import Signup from './stateless/Signup';
import Login from './stateless/Login';
import Navigation from './stateless/Navigation';
import MatchMakerContainer from './potential/MatchMakerContainer';
import MatchesContainer from './matches/MatchesContainer';
import PhotoUploadContainer from './user/photoUpload/PhotoUploadContainer';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/navigation" component={Navigation} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/matchMaker" component={MatchMakerContainer} />
    <Route path="/matchMaker:redditId" component={MatchMakerContainer} />
    <Route path="/matches" component={MatchesContainer} />
    <Route path="/photoUpload" component={PhotoUploadContainer} />
  </Router>
);
