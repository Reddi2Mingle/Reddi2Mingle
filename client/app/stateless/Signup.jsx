import React from 'react';

export default () => (
  <div className="signup-view">
    <div className="signup-info">
      <img
        src="../../../assets/img/reddit.png"
        alt="Reddit Logo"
        style={{ width: 150, height: 150 }}
      />
      <h1>REDDI2MINGLE?</h1>
      <span style={{ flex: 1 }} />
      <div className="button-group">
        <form action="http://www.reddi2mingle.com/auth/reddit" method="GET">
          <button>
            Sign up with Reddit
          </button>
        </form>
        <form action="http://www.reddi2mingle.com/login" method="GET">
          <button>
              Log in with existing account
          </button>
        </form>
      </div>
    </div>
  </div>
);
