import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PhotoUpload from './PhotoUpload';
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
)(PhotoUpload);

export default UserContainer;
