import { connect } from 'react-redux';
import Matches from './Matches';

const mapStateToProps = (state) => (
  {
    matches: state.matches,
    userId: state.user.redditId,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    dispatch: action => {
      dispatch(action);
    },
  }
);

const MatchesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches);

export default MatchesContainer;
