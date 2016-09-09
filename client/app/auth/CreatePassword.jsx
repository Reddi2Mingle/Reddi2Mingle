import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class CreatePassword extends Component {

  componentDidMount() {
    const { userActions, location: { query } } = this.props;
    const redditId = query.redditId;
    sessionStorage.setItem('redditId', redditId);
    userActions.saveRedditId(redditId);
  }

  createPassword(event) {
    const { location: { query } } = this.props;
    const redditId = query.redditId;
    event.preventDefault();
    const message = ReactDOM.findDOMNode(this.refs.newPassword).value;
    if (message.length >= 8) {
      axios.post('/api/userInfo/updatePassword', {
        redditId,
        password: message,
      })
      .then(() => {})
      .catch(() => {});
      this.props.history.push('/preferences');
    }
  }

  render() {
    return (
      <div className="password-view">
        <div className="password-content">
          <h1>Create a new password for Reddi2Mingle</h1>
          <div>
            <input type="password" ref="newPassword" />
            <button
              onClick={e => {
                this.createPassword(e);
              }}
            ><h2>Continue</h2></button>
          </div>
          <p className="white">password must be at least 8 characters long</p>
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
