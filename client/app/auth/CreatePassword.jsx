import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class CreatePassword extends Component {

  componentWillMount() {
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
      <div>
        <h1>Create a new password for Reddi2Mingle</h1>
        <h6>(please don't use your Reddit password)</h6>
        <div>
          <textarea ref="newPassword" />
          <button
            onClick={e => {
              this.createPassword(e);
            }}
          >Continue</button>
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
