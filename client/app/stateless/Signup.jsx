import React from 'react';
import io from 'socket.io-client';

export default () => (
  <div className="signup-view">
    <div className="info-box">
      <img src="../../../assets/img/reddit.png" alt="Reddit Logo"/>
      <h1>REDDI2MINGLE?</h1>
      <button>
        <a href="auth/reddit">
          Signup with Reddit
        </a>
      </button>
    </div>
  </div>
);
