import React, { Component } from 'react';


export default class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderMale: false,
      genderFemale: false,
      genderActive: false,
      preferenceMale: false,
      preferenceFemale: false,
      preferenceActive: false,
    };
  }

  setOptions(option, selection) {
    console.log('set options being invoked', option, selection);
    const optSelect = option.concat(selection);

    if (optSelect === 'genderFemale') {
      this.setState({
        genderFemale: true,
        genderMale: false,
        genderActive: true,
      });
    } else if (optSelect === 'genderMale') {
      this.setState({
        genderFemale: false,
        genderMale: true,
        genderActive: true,
      });
    }
    if (optSelect === 'preferenceFemale') {
      this.setState({
        preferenceFemale: true,
        preferenceMale: false,
        preferenceActive: true,
      });
    } else if (optSelect === 'preferenceMale') {
      this.setState({
        preferenceFemale: false,
        preferenceMale: true,
        preferenceActive: true,
      });
    }
  }

  isActive() {
    console.log('isActive');
    return 'spanActive';
  }

  submitAction(event) {
    if (this.state.genderActive === true && this.state.preferenceActive === true) {
      console.log(this.state);
      event.preventDefault();
      this.props.history.push('/photoUpload');
    }
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
            <span className={} onClick={this.setOptions.bind(this, 'gender', 'Male')}>
              <img
                src="../../../assets/img/mustache.png"
                alt="mustache"
              />
            </span>
            <span className={this.isActive()} onClick={this.setOptions.bind(this, 'gender', 'Female')}>
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
            <span onClick={this.setOptions.bind(this, 'preference', 'Male')}>
              <img
                src="../../../assets/img/mustache.png"
                alt="mustache"
              />
            </span>
            <span onClick={this.setOptions.bind(this, 'preference', 'Female')}>
              <img
                src="../../../assets/img/lips.png"
                alt="lips"
              />
            </span>
          </div>
        </div>
        <br/> 
        <button onClick={this.submitAction.bind(this)}> 
          <h2> Submit </h2> 
        </button>
      </div>
    );
  }
}

