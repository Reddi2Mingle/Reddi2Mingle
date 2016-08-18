import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as UserActions from '../user/UserActions';

const NavBar = ({ userActions }) => (
  <div className="navigation" style={{ backgroundColor: 'black' }}>
    <Link to="/profile">
      <h2> Profile </h2>
    </Link>
    <Link to="/createPassword">
      <h2> createPassword </h2>
    </Link>
    <Link to="/profile">
      <h2> profile </h2>
    </Link>
    <Link to="/">
      <h2> potential </h2>
    </Link>
    <Link to="/matches">
      <h2> matches </h2>
    </Link>
    <button
      onClick={(e) => {
        e.preventDefault();
        userActions.logout();
      }}
    >
      <h2> Logout </h2>
    </button>
  </div>
);

const mapStateToProps = state => ({});
const mapDispatchToProps = (dispatch) => (
  {
    userActions: bindActionCreators(UserActions, dispatch),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

NavBar.propTypes = {
  userActions: PropTypes.object.isRequired,
};
