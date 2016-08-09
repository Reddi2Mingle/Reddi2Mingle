import React from 'react';
import { Link } from 'react-router';

export default () => (
  <div>
    <h1>Reddi 2 Mingle</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">SignUp</Link></li>
      <li><Link to="/matchmaker">Matchmaker</Link></li>
      <li><Link to="/matched">Matched</Link></li>
      <li><Link to="/profile">Profile</Link></li>
    </ul>
  </div>
);
