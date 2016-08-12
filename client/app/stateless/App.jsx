import React from 'react';
import { Link } from 'react-router';

export default () => (
  <div>
    <h1 >Reddi2Mingle</h1>
    <ul>
      <li><Link to="/">Homeyio</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">SignUp</Link></li>
      <li><Link to="/potential">Potential</Link></li>
      <li><Link to="/matches">Matches</Link></li>
      <li><Link to="/profile">Profile</Link></li>
    </ul>
  </div>
);
