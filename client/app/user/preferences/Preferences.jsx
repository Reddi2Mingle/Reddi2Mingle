import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as UserActions from '../UserActions';
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
      });
    } else if (selection === 'genderMale') {
      this.setState({
        genderFemale: false,
        genderMale: true,
      });
    }
    if (selection === 'preferenceFemale') {
      this.setState({
        preferenceFemale: !this.state.preferenceFemale,
      });
    } else if (selection === 'preferenceMale') {
      this.setState({
        preferenceMale: !this.state.preferenceMale,
      });
    }
  }

  submitAction(event) {
    let gender = '';
    let preference = '';

    if (this.state.genderFemale) {
      gender = 'woman';
      this.state.genderActive = true;
    } else if (this.state.genderMale) {
      gender = 'man';
      this.state.genderActive = true;
    }

    if (this.state.preferenceFemale && this.state.preferenceMale) {
      preference = 'both';
      this.state.preferenceActive = true; // manually toggle back to true
    } else if (this.state.preferenceMale) {
      preference = 'man';
      this.state.preferenceActive = true; 
    } else if (this.state.preferenceFemale) {
      preference = 'woman';
      this.state.preferenceActive = true; 
    }

    axios.post('/api/userInfo/addPreference', {
      redditId: this.props.redditId,
      gender,
      preference,
    })
    .then((response) => {
      if (this.state.genderActive && this.state.preferenceActive) {
        event.preventDefault();
        this.props.history.push(`/photoUpload?redditId=${this.props.redditId}`);
      }
    })
    .catch((err) => {
      console.log('Add preferences error', err);
    });
  }

  render() {
    const { redditId } = this.props;
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
        <br/> 
        <button onClick={this.submitAction.bind(this)}>
          <h2> Submit </h2>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  redditId: state.user.redditId,
});
const mapDispatchToProps = (dispatch) => (
  {
    userActions: bindActionCreators(UserActions, dispatch),
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preferences);

Preferences.PropTypes = {
  redditId: PropTypes.string,
};


