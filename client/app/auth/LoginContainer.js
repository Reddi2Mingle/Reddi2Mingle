import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login.jsx';
import * as UserActions from '../user/UserActions';

const mapStateToProps = state => (
	{ userId: state.user.redditId }
);

const mapDispatchToProps = (dispatch) => (
	{ userActions: bindActionCreators(UserActions, dispatch) }
);

const CreateLoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

export default CreateLoginContainer;