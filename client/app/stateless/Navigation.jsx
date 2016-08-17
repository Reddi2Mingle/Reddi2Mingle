import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class NavBar extends Component {
  render() {
    return (
      <div className="navigation" style={{ backgroundColor: 'black' }}>
        <Link to="/signup">
          <h2> signup </h2>
        </Link>
        <Link to="/photoUpload">
          <h2> photo upload </h2>
        </Link>
        <Link to="/profile">
          <h2> profile </h2>
        </Link>
        <Link to="/matchMaker">
          <h2> potential </h2>
        </Link>
        <Link to="/matches">
          <h2> matches </h2>
        </Link>
      </div>
    );
  }
}