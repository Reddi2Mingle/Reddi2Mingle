import React, { Component } from 'react';


export default class Preferences extends Component {
  render() {
    return (
      <div className="preferences-view">
        <h1> Basics First </h1>
        <div className="preferences-container">
          <h2>
            I am a
          </h2>
          <div className="preferences-options">
            <a>
              <img
                src="../../../assets/img/mustache.png"
                alt="mustache"
              />
            </a>
            <span>
              <img
                src="../../../assets/img/lips.png"
                alt="lips"
              />
            </span>
          </div>
          <h2>
            Looking for a
          </h2>
          <div className="preferences-options">
            <span>
              <img
                src="../../../assets/img/mustache.png"
                alt="mustache"
              />
            </span>
            <span>
              <img
                src="../../../assets/img/lips.png"
                alt="lips"
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

