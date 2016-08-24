import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as UserActions from '../user/UserActions';

const NavBar = ({ userActions, user, matches }) => (
  <div className="navigation" style={{ backgroundColor: 'black' }}>
    <Link to="/profile">
      <img src={user.photo} style={{ width: '20px' }} />
      <h2> {user.name} </h2>
    </Link>
    <Link to="/">
      <h1 style={{ fontSize: '1.5em' }}> REDDI2MINGLE </h1>
    </Link>
    <Link to="/matches">
      {(matches.notification) ?
        <i className="material-icons md-48 orange">favorite</i>
        :
        <i className="material-icons md-48 white">favorite_border</i>
      }
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

const mapStateToProps = state => ({
  user: state.user,
  matches: state.matches,
});
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
  user: PropTypes.object.isRequired,
};
