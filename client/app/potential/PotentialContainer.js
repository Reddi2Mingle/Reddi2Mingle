import { connect } from 'react-redux';
import { updateUsername } from './PotentialActions';
import Potential from './Potential';

const mapStateToProps = (state) => (
  {
    username: state.potential.username,
    picUrl: state.potential.picUrl,
    subreddits: state.potential.subreddits,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    changeName: () => {
      dispatch(updateUsername('Tyler'));
    },
  }
);

const PotentialContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Potential);

export default PotentialContainer;
