import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Matches from './Matches';
import * as MatchesActions from './MatchesActions';

const mapStateToProps = (state) => {
  if (state.matches.length === 0) {
    return {
      noMatches: true,
      userId: state.user.redditId,
    };
  }
  return {
    matches: state.matches,
    userId: state.user.redditId,
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    matchesActions: bindActionCreators(MatchesActions, dispatch),
  }
);

const MatchesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches);

export default MatchesContainer;
