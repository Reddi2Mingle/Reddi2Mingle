import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Preferences from './Preferences';
import * as UserActions from '../UserActions';

const mapStateToProps = (state) => (
  {
    username: state.user.username,
    picUrl: state.user.picUrl,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    userActions: bindActionCreators(UserActions, dispatch),
  }
);

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Preferences);

export default UserContainer;
