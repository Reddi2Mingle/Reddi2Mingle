import { connect } from 'react-redux';
import Matches from '../components/Matches';

const mapStateToProps = (state) => (
  {
    matches: state.user.matches,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    
  }
);

const MatchesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches);

export default MatchesContainer;
