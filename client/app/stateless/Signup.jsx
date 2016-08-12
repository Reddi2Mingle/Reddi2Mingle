import React from 'react';
import io from 'socket.io-client';

export default () => (
  <div className="signup-view">
    <div className="info-box">
      <img src="../../../assets/img/reddit.png" alt="Reddit Logo" style={{width: 150, height: 150}}/>
      <h1>REDDI2MINGLE?</h1>
      <div>
        <button>
          <a href="auth/reddit">
            Signup with Reddit
          </a>
        </button>
        <button>
          <a href="auth/reddit">
            Login
          </a>
        </button>
      </div>
    </div>
  </div>
);
