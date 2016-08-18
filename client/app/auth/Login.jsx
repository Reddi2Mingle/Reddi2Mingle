import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Login extends Component {

  sendCredentials(event) {
    const { userId } = this.props;
    event.preventDefault();
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    axios.post('/api/userInfo/loginCredentials', {
      username,
      password,
    })
		.then((response) => {
      console.log(`user logged in ${response.data}`);
		})
		.catch((err) => {
			console.log(`user not logged in ${err}`);
		});
  }

  render() {
    return (
      <div className="potential-view">
        <h1>username</h1>
        <textarea ref="username" />
        <h1>password</h1>
        <textarea ref="password" />
        <button
          onClick={e => {
            this.sendCredentials(e);
          }}
        >Continue</button>
      </div>
    );
  }
}
