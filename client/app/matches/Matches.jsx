import React, { PropTypes, Component } from 'react';
import Match from './Match';
import Navbar from '../stateless/Navigation';
import { socket } from '../socket';

export default class Matches extends Component {

  componentWillMount() {
    const redditId = sessionStorage.getItem('redditId');
    const {
      potentialActions,
      userActions,
      matchesActions,
      user,
      potentialsFetched,
      matches,
    } = this.props;

    matchesActions.resetNotification();

    // if this is the first time loading the app, fetch all userInfo, potentials, and matches
    if (!user.fetched) {
      userActions.fetchUser(redditId);
      socket.emit('save my id', redditId);
    }
    if (!potentialsFetched) {
      potentialActions.fetchPotentials(redditId);
    }
    if (!matches.fetched) {
      matchesActions.fetchMatches(redditId);
    }
  }

  render() {
    const { matches, noMatches } = this.props;
    if (matches.fetching) {
      return (
        <div>
          <Navbar />
          <div className="matches-view">
            <img src="../../../assets/img/heart.gif" alt="beating heart gif" />
            <h2>Hold on, we're getting you ready to mingle</h2>
          </div>
        </div>
      );
    }
    if (noMatches) {
      return (
        <div>
          <Navbar />
          <div className="matches-view">
            <h2>No Matches found! Better start swiping :) </h2>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <div className="matches-view">
          {matches.people.map(match => (
            <Match
              name={match.name}
              photo={match.photo}
              common_subreddits={match.common_subreddits}
              key={match.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

Matches.propTypes = {
  user: PropTypes.object,
  potentialsFetched: PropTypes.bool,
  matches: PropTypes.object,
  userActions: PropTypes.object,
  potentialActions: PropTypes.object,
  matchesActions: PropTypes.object,
  noMatches: PropTypes.bool,
};
