import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Matches from './Matches';
import * as MatchesActions from './MatchesActions';

const mapStateToProps = (state) => (
  {
    matches: state.matches,
    userId: state.user.redditId,
  }
);

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
