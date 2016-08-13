import React from 'react';
import io from 'socket.io-client';

export default () => (
  <div className="signup-view">
    <div className="signup-info">
      <img src="../../../assets/img/reddit.png" alt="Reddit Logo" style={{width: 150, height: 150}}/>
      <h1>REDDI2MINGLE?</h1>
      <span style={{flex: 1}}> </span>
      <div className="button-group">
        <button>
          <a href="auth/reddit">
            Sign up with Reddit
          </a>
        </button>
        <button>
          <a href="auth/reddit">
            Log in with existing account
          </a>
        </button>
      </div>
    </div>
  </div>
);
