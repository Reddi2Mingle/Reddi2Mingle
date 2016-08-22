import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Login extends Component {

  componentWillUpdate() {
    this.props.history.push('/');
  }

  sendCredentials(event) {
    const { userActions } = this.props;
    event.preventDefault();
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    userActions.userLogin(username, password);
  }

  render() {
    return (
      <div className="login-view">
        <div className="login-content">
          <h1>username:</h1>
          <input ref="username" />
        </div>
        <div className="login-content">
          <h1>password: </h1>
          <input ref="password" />
        </div>
        <button
          onClick={e => {
            this.sendCredentials(e);
          }}
        ><h2>Continue</h2></button>
      </div>
    );
  }
}

Login.propTypes = {
  userActions: PropTypes.object,
  history: PropTypes.object,
  redditId: PropTypes.string,
};

