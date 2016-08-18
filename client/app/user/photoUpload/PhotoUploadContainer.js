import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PhotoUpload from './PhotoUpload';
import * as UserActions from '../UserActions';
import * as PotentialActions from '../../potential/PotentialActions';

const mapStateToProps = (state) => (
  {
    redditId: state.user.redditId,
    username: state.user.username,
    photo: state.user.photo,
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
