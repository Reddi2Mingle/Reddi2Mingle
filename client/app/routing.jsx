import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// import Store from './AppStore.js';
import App from './App';
import Signup from './auth/Signup';
// import WelcomeView from './auth/WelcomeView';
// import MatchmakerView from './matches/Matchmaker';
// import MatchedView from './matches/Matched';
// import ProfileView from './profile/Profile';

//   <Provider store={Store}>
//     <Router history={browserHistory}>
//       <Route path='/' component={App}>
//         <IndexRoute component={WelcomeView}/>
//         <Route path='/matchmaker' component={MatchmakerView}/>
//         <Route path='/matched' component={MatchedView} />
//         <Route path='/profile' component={ProfileView}/>
//       </Route>
//     </Router>
//   </Provider>

export default class Routes extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App} />
        <Route path="/signup" component={Signup} /> 
      </Router>
    );
  }
}
