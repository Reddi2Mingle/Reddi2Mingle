import { connect } from 'react-redux';
import { updateUsername } from './PotentialActions';
import Potential from './Potential';

const mapStateToProps = (state) => (
  {
    name: state.potential.name,
    photo: state.potential.photo,
    subreddits: state.potential.subreddits,
    isFetching: state.user.fetching,
    userLoggedIn: !!state.user.redditId,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    changeName: () => {
      dispatch(updateUsername('Tyler'));
    },
    dispatch: (action) => {
      dispatch(action);
    },
  }
);

const PotentialContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Potential);

export default PotentialContainer;
