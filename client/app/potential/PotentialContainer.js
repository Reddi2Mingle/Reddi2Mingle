import { connect } from 'react-redux';
import { incrementIndex } from './PotentialActions';
import Potential from './Potential';

const mapStateToProps = (state) => (
  {
    name: state.potentials.people[state.potentials.index].name,
    photo: state.potentials.people[state.potentials.index].photo,
    subreddits: state.potentials.people[state.potentials.index].subreddits,
    isFetching: state.user.fetching,
    userLoggedIn: !!state.user.redditId,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    showNextUser: () => {
      dispatch(incrementIndex());
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
