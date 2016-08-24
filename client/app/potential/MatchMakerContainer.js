import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MatchMaker from './MatchMaker.jsx';
import * as UserActions from '../user/UserActions';
import * as PotentialActions from './PotentialActions';
import * as MatchesActions from '../matches/MatchesActions';

const mapStateToProps = state => {
  if (state.potentials.people.length === 0) {
    return {
      user: state.user,
      potential: state.potentials.people[state.potentials.index],
      matchesFetched: state.matches.fetched,
      potentialsFetched: state.potentials.fetched,
      noPotentials: true,
      fetchingPotentials: state.potentials.fetching,
    };
  }

  return {
    user: state.user,
    potential: state.potentials.people[state.potentials.index],
    matchesFetched: state.matches.fetched,
    potentialsFetched: state.potentials.fetched,
    fetchingPotentials: state.potentials.fetching,
    index: state.potentials.index,
    lastPotential: state.potentials.people.length - 1,
  };
};

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(UserActions, dispatch),
  potentialActions: bindActionCreators(PotentialActions, dispatch),
  matchesActions: bindActionCreators(MatchesActions, dispatch),
});

const MatchMakerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchMaker);

export default MatchMakerContainer;
