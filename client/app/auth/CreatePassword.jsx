import React, { Component } from 'react';
import axios from 'axios';
import request from 'superagent';

export default class CreatePassword extends Component {

  createPassword(event) {
    event.preventDefault();
    var newPassword = ReactDOM.findDOMNode(this.refs.newPassword).value;
    axios.post('/api/userInfo/updatePassword', {
      password: newPassword,
    })
    .then((response) => {
      console.log(`password updated successfully: ${response}`);
    })
    .catch((err) => {
      console.log(`password not updated: ${err}`);
    });

  }

  render() {
    const {
      userId,
      userActions,
    } = this.props;
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

