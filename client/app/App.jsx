import React from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>Reddi2Mingle</h1>
        <ul role="nav">
          <li><Link to="/" onlyActiveOnIndex>Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">SignUp</Link></li>
          <li><Link to="/matchmaker">Matchmaker</Link></li>
          <li><Link to="/matched">Matched</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </div>
    );
  }
}
