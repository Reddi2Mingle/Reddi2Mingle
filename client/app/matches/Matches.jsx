import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Match from './Match';
import { fetchMatches } from './MatchesActions';

export default class Matches extends Component {

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
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Link to="/matchMaker">
            <i className="material-icons md-48 black">keyboard_arrow_left</i>
          </Link>
          <Link to="/matches">
            <i className="material-icons md-48 black">keyboard_arrow_right</i>
          </Link>
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
  dispatch: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
