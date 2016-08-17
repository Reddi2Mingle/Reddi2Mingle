import React from 'react';
import { Link } from 'react-router';

export default () => (
  <div className="app">
    <h1 >Reddi2Mingle</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/navigation">Navigation</Link></li>
      <li><Link to="/signup">SignUp</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/photoUpload">Photo Upload</Link></li>
      <li><Link to="/potential">Potential</Link></li>
      <li><Link to="/matches">Matches</Link></li>
    </ul>
  </div>
);
