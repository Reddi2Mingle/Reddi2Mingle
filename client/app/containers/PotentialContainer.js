import { connect } from 'react-redux';
import { updateUsername } from '../actions/potentialActions';
import Potential from '../components/Potential';

const mapStateToProps = (state) => (
  {
    username: state.potential.username,
    picUrl: state.potential.picUrl,
    subreddits: state.potential.subreddits,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onClick: () => {
      dispatch(updateUsername('Tyler'));
    },
  }
);

const PotentialContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Potential);

export default PotentialContainer;
