import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PhotoUpload from './PhotoUpload';
import * as UserActions from '../UserActions';
import * as PotentialActions from '../../potential/PotentialActions';

const mapStateToProps = (state) => (
  {
    username: state.user.username,
    picUrl: state.user.picUrl,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    userActions: bindActionCreators(UserActions, dispatch),
    potentialActions: bindActionCreators(PotentialActions, dispatch),
  }
);

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoUpload);

export default UserContainer;
