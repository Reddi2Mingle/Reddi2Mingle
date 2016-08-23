import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Matches from './Matches';
import * as UserActions from '../user/UserActions';
import * as PotentialActions from '../potential/PotentialActions';
import * as MatchesActions from './MatchesActions';

const mapStateToProps = state => {
  if (state.matches.people.length === 0) {
    return {
      noMatches: true,
      user: state.user,
      potentialsFetched: state.potentials.fetched,
      matches: state.matches,
    };
  }
  return {
    matches: state.matches,
    user: state.user,
    potentialsFetched: state.potentials.fetched,
  };
};

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(UserActions, dispatch),
  potentialActions: bindActionCreators(PotentialActions, dispatch),
  matchesActions: bindActionCreators(MatchesActions, dispatch),
});

const MatchesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches);

export default MatchesContainer;
