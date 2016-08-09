import React from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default class Login extends React.Component {
  handleClick() {
    socket.emit('userLogin');
  }

  render() {
    return (
      <div>
        <h1>Login with your Reddit Account</h1>
        <button onClick={this.handleClick}>Login with Reddit</button>
      </div>
    );
  }
}
