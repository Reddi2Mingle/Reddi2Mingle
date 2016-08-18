import React, { Component } from 'react';
import MaleButton from './MaleButton';
import FemaleButton from './FemaleButton';

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

  setOption(selection) {
    if (selection === 'genderFemale') {
      this.setState({
        genderFemale: true,
        genderMale: false,
        genderActive: true,
      });
    } else if (selection === 'genderMale') {
      this.setState({
        genderFemale: false,
        genderMale: true,
        genderActive: true,
      });
    }
    if (selection === 'preferenceFemale') {
      this.setState({
        preferenceFemale: true,
        preferenceMale: false,
        preferenceActive: true,
      });
    } else if (selection === 'preferenceMale') {
      this.setState({
        preferenceFemale: false,
        preferenceMale: true,
        preferenceActive: true,
      });
    }
  }

  submitAction(event) {
    if (this.state.genderActive === true && this.state.preferenceActive === true) {
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
            <MaleButton
              className={this.state.genderMale ? 'active' : ''}
              onClick={this.setOption.bind(this, 'genderMale')}
            />
            <FemaleButton
              className={this.state.genderFemale ? 'active' : ''}
              onClick={this.setOption.bind(this, 'genderFemale')}
            />
          </div>
          <h2>
            Looking for a
          </h2>
          <div className="preferences-options">
            <MaleButton
              className={this.state.preferenceMale ? 'active' : ''}
              onClick={this.setOption.bind(this, 'preferenceMale')}
            />
            <FemaleButton
              className={this.state.preferenceFemale ? 'active' : ''}
              onClick={this.setOption.bind(this, 'preferenceFemale')}
            />
          </div>
        </div>
        <br />
        <button onClick={this.submitAction.bind(this)}>
          <h2> Submit </h2>
        </button>
      </div>
    );
  }
}

