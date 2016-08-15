import { connect } from 'react-redux';
import MatchMaker from './MatchMaker.jsx';

const mapStateToProps = (state) => (
  {
    name: state.potentials.people[state.potentials.index].name,
    photo: state.potentials.people[state.potentials.index].photo,
    common_subreddits: state.potentials.people[state.potentials.index].common_subreddits,
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
    dispatch: action => {
      dispatch(action);
    },
  }
);

const PotentialContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchMaker);

export default PotentialContainer;
