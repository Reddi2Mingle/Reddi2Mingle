import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Login extends Component {

  componentDidUpdate() {
    const { user } = this.props;
    if (user.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  sendCredentials(event) {
    const { userActions } = this.props;
    event.preventDefault();
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    userActions.userLogin(username, password);
  }

  render() {
    const { user } = this.props;
    if (user.loggingIn) {
      return (
        <div className="login-view">
          <div className="column">
            <img src="../../../assets/img/heart.gif" alt="beating heart gif" />
            <h2>Loading... I hope you're ready to mingle!</h2>
          </div>
        </div>
      );
    }
    return (
      <div className="login-view">
        <div className="login-content">
          <h1>username:</h1>
          <input ref="username" />
        </div>
        <div className="login-content">
          <h1>password:</h1>
          <input type="password" ref="password" />
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
  user: PropTypes.object,
};

