import React from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default class Signup extends React.Component {
  handleClick() {
    socket.emit('userSignUp');
  }

  render() {
    return (
      <div> 
        <h1> Sign Up with your Reddit Account </h1> 
        <button> 
          <a href="auth/reddit">
            Login with Reddit
          </a>
        </button>
      </div>
    );
  }
}