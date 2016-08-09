import React from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:80');

export default () => (
  <div>
    <h1>Sign Up with your Reddit Account</h1>
    <button>
      <a href="auth/reddit">
        Signup with Reddit
      </a>
    </button>
  </div>
);
