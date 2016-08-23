import React, { Component, PropTypes } from 'react';
import Navbar from '../stateless/Navigation';
import RejectButton from './RejectButton';
import InterestButton from './InterestButton';
import { socket } from '../socket';


export default class MatchMaker extends Component {

  componentWillMount() {
    const redditId = localStorage.getItem('token');
    const {
      potentialActions,
      userActions,
      matchesActions,
      user,
      matchesFetched,
      potentialsFetched,
    } = this.props;

    // if this is the first time loading the app, fetch all userInfo, potentials, and matches
    if (!user.fetched) {
      userActions.fetchUser(redditId);
      socket.emit('save my id', redditId);
    }
    if (!potentialsFetched) {
      potentialActions.fetchPotentials(redditId);
    }
    if (!matchesFetched) {
      matchesActions.fetchMatches(redditId);
    }
  }

  // componentDidMount() {
  //   const { potentialActions } = this.props;
  //   socket.on('get new match', (userInfo) => {
  //     potentialActions.pushMatch(userInfo);
  //   });
  // }

  render() {
    const {
      user,
      potential,
      fetchingPotentials,
      potentialActions,
      index,
      lastPotential,
      noPotentials,
    } = this.props;
    if (fetchingPotentials) {
      return (
        <div>
          <Navbar />
          <div className="potential-view">
            <img src="../../../assets/img/heart.gif" alt="beating heart gif" />
            <h2>Hold on, we're getting you ready to mingle</h2>
          </div>
        </div>
      );
    }
    if (noPotentials) {
      return (
        <div>
          <Navbar />
          <div className="potential-view">
            <h2>Oh no! You're out of potentials. Please check back in a bit.</h2>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <div className="potential-view">
          <div className="potential-card">
            <img
              src={potential.photo}
              className="full-profile-image"
              alt="Redditor"
            />
            <div className="potential-info">
              <h3>{potential.name}</h3>
              <div className="potential-more-info">
                <i className="material-icons md-48 orange">favorite</i>
                <span className="heart-text"> r/ </span>
                <div className="subreddit-list">
                  <ul>
                    {potential.common_subreddits.map(sub => (
                      <span>{sub}</span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="swipe">
              <RejectButton
                handleSwipe={potentialActions.handleSwipe}
                userId={user.redditId}
                potentialId={potential.redditId}
                index={index}
                lastPotential={lastPotential}
              />
              <InterestButton
                handleSwipe={potentialActions.handleSwipe}
                userId={user.redditId}
                index={index}
                lastPotential={lastPotential}
                potential={potential}
                socket={socket}
                user={user}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MatchMaker.propTypes = {
  user: PropTypes.object,
  potential: PropTypes.object,
  userActions: PropTypes.object,
  potentialActions: PropTypes.object,
  matchesActions: PropTypes.object,
  fetchingPotentials: PropTypes.bool,
  matchesFetched: PropTypes.bool,
  potentialsFetched: PropTypes.bool,
  index: PropTypes.number,
  lastPotential: PropTypes.number,
  noPotentials: PropTypes.bool,
};
