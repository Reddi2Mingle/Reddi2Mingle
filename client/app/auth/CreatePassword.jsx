import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class CreatePassword extends Component {

  componentWillMount() {
    const { userId, userActions } = this.props;
  }

  createPassword(event) {
    event.preventDefault();
    var message = ReactDOM.findDOMNode(this.refs.newPassword).value;
    axios.post('/api/userInfo/updatePassword', {
      password: message,
    })
    .then((response) => {
      console.log(`password updated successfully: ${message}`);
      this.props.history.push('/photoUpload');
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

