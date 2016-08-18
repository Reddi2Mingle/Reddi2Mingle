import React from 'react';
import { connect } from 'react-redux';

export default (Component) => {
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        this.props.history.push('/signup');
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
              ? <Component history={this.props.history} />
              : null
          }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
};
