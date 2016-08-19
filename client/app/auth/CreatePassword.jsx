import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class CreatePassword extends Component {

  componentDidMount() {
    const { userActions, location: { query } } = this.props;
    const redditId = query.redditId;
    localStorage.setItem('token', redditId);
    userActions.fetchUser(redditId);
  }

  createPassword(event) {
    event.preventDefault();
    const message = ReactDOM.findDOMNode(this.refs.newPassword).value;
    axios.post('/api/userInfo/updatePassword', {
      password: message,
    })
    .then(() => {
      this.props.history.push('/preferences');
    })
    .catch((err) => {
      console.log(`password not updated: ${err}`);
    });
  }

  render() {
    return (
      <div className="password-view">
        <div className="password-content">
          <h1>Create a new password for Reddi2Mingle</h1>
          <h2> But let's get creative </h2>
          <p className="white">(aka, please don't use your Reddit password)</p>
          <div>
            <input text="text" ref="newPassword" />
            <button
              onClick={e => {
                this.createPassword(e);
              }}
            ><h2>Continue</h2></button>
          </div>
        </div>
      </div>
    );
  }
}

CreatePassword.propTypes = {
  userId: PropTypes.string,
  userActions: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.array,
};
