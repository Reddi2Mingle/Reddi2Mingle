import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Login extends Component {

  componentWillMount() {
		const { userId } = this.props;
  }

  sendCredentials(event) {
    event.preventDefault();
    var username = ReactDOM.findDOMNode(this.refs.username).value;
    var password = ReactDOM.findDOMNode(this.refs.password).value;
    axios.post('/api/userInfo/loginCredentials', {
      username: username,
      password: password,
    })
		.then((response) => {
      console.log(`user logged in ${response}`);
		})
		.catch((err) => {
			console.log(`user not logged in ${err}`);
		});
  }

  render() {
    return (
      <div>
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
