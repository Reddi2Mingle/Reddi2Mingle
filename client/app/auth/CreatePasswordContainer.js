import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreatePassword from './CreatePassword.jsx';
import * as UserActions from '../user/UserActions';

const mapStateToProps = state => ({
  userId: state.user.redditId,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(UserActions, dispatch),
});

const CreatePasswordContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreatePassword);

export default CreatePasswordContainer;
