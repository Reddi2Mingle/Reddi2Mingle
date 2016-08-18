import React, { PropTypes, Component } from 'react';
import Match from './Match';
import Navbar from '../stateless/Navigation';

export default class Matches extends Component {

  componentWillMount() {
    const { matchesActions, userId } = this.props;
    matchesActions.fetchMatches(userId);
  }

  render() {
    const { matches } = this.props;
    return (
      <div>
        <Navbar />
        <div className="matches-view">
          {matches.map((match) => (
            <Match
              name={match.name}
              photo={match.photo}
              subreddits={match.subreddits}
            />
          ))}
        </div>
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
  matchesActions: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
};
