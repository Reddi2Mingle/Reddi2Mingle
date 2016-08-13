import { connect } from 'react-redux';
import { incrementIndex } from './PotentialActions';
import Potential from './Potential';

const mapStateToProps = (state) => (
  {
    name: state.potentials.people[state.potentials.index].name,
    photo: state.potentials.people[state.potentials.index].photo,
    subreddits: state.potentials.people[state.potentials.index].subreddits,
    potentialId: state.potentials.people[state.potentials.index].redditId,
    userId: state.user.redditId,
    fetchingUser: state.user.fetching,
    userLoggedIn: !!state.user.redditId,
    fetchingPotentials: state.potentials.fetching,
    index: state.potentials.index,
    lastPotential: state.potentials.people.length - 1,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
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
