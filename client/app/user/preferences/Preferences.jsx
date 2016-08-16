import React, { Component } from 'react';


export default class Preferences extends Component {
  render() {
    return (
      <div className="preferences-view">
        <h1> Basics First! </h1>
        <div className="preferences-container">
          <h2>
            I am a
          </h2>
          <img
            src="../../../assets/img/mustache.png"
            alt="mustache"
          />
          <img
            src="../../../assets/img/lips.png"
            alt="lips"
          />
          <h2>
            Looking for a 
          </h2>
        </div>
      </div>
    );
  }
}

