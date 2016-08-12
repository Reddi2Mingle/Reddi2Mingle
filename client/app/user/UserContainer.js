import { connect } from 'react-redux';
import User from './User';

const mapStateToProps = (state) => (
  {
    username: state.user.username,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    
  }
);

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default UserContainer;
