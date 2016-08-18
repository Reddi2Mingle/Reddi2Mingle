import React, { Component, PropTypes } from 'react';
import Navbar from '../stateless/Navigation';
import RejectButton from './RejectButton';
import InterestButton from './InterestButton';

export default class MatchMaker extends Component {

  componentWillMount() {
    const { potentialActions, userActions, userInfoFetched, userId } = this.props;
    // const token = localStorage.getItem('token');
    if (!userInfoFetched) {
      userActions.fetchUser(userId);
    }
    potentialActions.fetchPotentials(userId);
  }

  render() {
    const {
      name,
      potentialId,
      userId,
      photo,
      common_subreddits,
      fetchingPotentials,
      potentialActions,
      index,
      lastPotential,
      noPotentials,
    } = this.props;
    if (fetchingPotentials) {
      return (
        <div className="potential-view">
          <img src="../../../assets/img/heart.gif" alt="beating heart gif" />
          <h2>Hold on, we're getting you ready to mingle</h2>
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
              src={photo}
              className="full-profile-image"
              alt="Redditor"
            />
            <div className="potential-info">
              <h3>{name}</h3>
              <div className="potential-more-info">
                <i className="material-icons md-48 orange">favorite</i>
                <span className="heart-text"> r/ </span>
                <ul className="subreddit-list">
                  {common_subreddits.map(sub => (
                    <span>{sub}</span>
                  ))}
                </ul>
              </div>
            </div>

            <div className="swipe">
              <RejectButton
                handleSwipe={potentialActions.handleSwipe}
                userId={userId}
                potentialId={potentialId}
                index={index}
                lastPotential={lastPotential}
              />
              <InterestButton
                handleSwipe={potentialActions.handleSwipe}
                userId={userId}
                potentialId={potentialId}
                index={index}
                lastPotential={lastPotential}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

MatchMaker.propTypes = {
  name: PropTypes.string,
  potentialId: PropTypes.string,
  userId: PropTypes.string,
  photo: PropTypes.string,
  common_subreddits: PropTypes.array,
  fetchingUser: PropTypes.bool,
  fetchingPotentials: PropTypes.bool,
  index: PropTypes.number,
  lastPotential: PropTypes.number,
  userActions: PropTypes.object,
  potentialActions: PropTypes.object,
  location: PropTypes.object,
  noPotentials: PropTypes.bool,
  userInfoFetched: PropTypes.bool,
};
