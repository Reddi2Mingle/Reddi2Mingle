import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login.jsx';
import * as UserActions from '../user/UserActions';

// We pass in redditId so that componentWillUpdate will recognize a state change
// and run this.props.history.push('/')
const mapStateToProps = state => ({
  redditId: state.user.redditId,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(UserActions, dispatch),
});

const CreateLoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

export default CreateLoginContainer;
