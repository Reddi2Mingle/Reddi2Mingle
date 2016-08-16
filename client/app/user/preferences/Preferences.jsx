import React, { Component } from 'react';


export default class Preferences extends Component {
  constructor() {
    super(props);
    this.state = {
      genderMale: false,
      genderFemale: false,
      preferenceMale: false,
      preferenceFemale: false,
      active: false,
    };
  }

  onClick(option, selection) {
    this.setState({

    })
  }

  handleSubmit() {

  }

  render() {
    return (
      <div className="preferences-view">
        <h1> Basics First </h1>
        <div className="preferences-container">
          <h2>
            I am a
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
        <button> Submit </button>
      </div>
    );
  }
}

