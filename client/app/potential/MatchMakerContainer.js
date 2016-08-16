import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MatchMaker from './MatchMaker.jsx';
import * as UserActions from '../user/UserActions';
import * as PotentialActions from './PotentialActions';

const mapStateToProps = state => {
  if (state.potentials.people.length === 0) {
    return {
      name: '',
      photo: '',
      common_subreddits: [],
      potentialId: '',
      userId: '',
      fetchingUser: state.user.fetching,
      userLoggedIn: !!state.user.redditId,
      fetchingPotentials: state.potentials.fetching,
      index: 0,
      lastPotential: 0,
    };
  }

  return {
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
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    userActions: bindActionCreators(UserActions, dispatch),
    potentialActions: bindActionCreators(PotentialActions, dispatch),
  }
);

const PotentialContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchMaker);

export default PotentialContainer;
