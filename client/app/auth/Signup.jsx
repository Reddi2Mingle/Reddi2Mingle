import React from 'react';
import socket from 'socket.io-client';

export default class Signup extends React.Component {
  handleClick() {
    socket.emit('userSignUp');
  }

  render() {
    return (
      <div> 
        <h1> Sign-up Here </h1> 
        <button onClick={this.handleClick}> Click here </button>
      </div>
    );
  }
}