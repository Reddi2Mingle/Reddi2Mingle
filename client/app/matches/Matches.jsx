import React, { PropTypes, Component } from 'react';
import Match from './Match';
import { fetchMatches } from './MatchesActions';

export default class Matches extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, userId } = this.props;
    dispatch(fetchMatches(userId));
  }

  render() {
    const { matches } = this.props;
    return (
      <div className="matches-view">
        {matches.map((match) => (
          <Match
            name={match.name}
            photo={match.photo}
            subreddits={match.subreddits}
          />
        ))}
      </div>
    );
  }
}

Matches.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    messageUrl: PropTypes.string.isRequired,
    subreddits: PropTypes.array.isRequired,
  }).isRequired),
  dispatch: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Matches;
