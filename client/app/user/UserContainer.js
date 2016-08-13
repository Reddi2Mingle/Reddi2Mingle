import { connect } from 'react-redux';
import User from './User';
import { updatePicUrl, fetchUser } from './UserActions';

const mapStateToProps = (state) => (
  {
    username: state.user.username,
    picUrl: state.user.picUrl,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    updatePicUrl: () => {
      dispatch(updatePicUrl('Tyler'));
    },
    fetchUser: () => {
      dispatch(fetchUser('Tyler'));
    },
  }
);

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default UserContainer;
