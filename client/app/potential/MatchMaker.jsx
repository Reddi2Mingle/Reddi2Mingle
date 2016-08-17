import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Navbar from '../stateless/Navigation';

export default class MatchMaker extends Component {

  componentWillMount() {
    const { potentialActions, userActions, userInfoFetched } = this.props;
    const token = localStorage.getItem('token');
    if (!userInfoFetched) {
      userActions.fetchUser(token.redditId);
    }
    potentialActions.fetchPotentials(token.redditId);
  }

  render() {
    const {
      name,
      potentialId,
      userId,
      photo,
      common_subreddits,
      fetchingUser,
      potentialActions,
      index,
      lastPotential,
      noMatches,
    } = this.props;
    if (noMatches) {
      return (
        <div>
          <h2>Oh no! You're out of potential matches.</h2>
        </div>
      );
    } else if (fetchingUser) {
      return (
        <div>
          <h2>Grabbing your information...</h2>
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
              <button
                onClick={e => {
                  e.preventDefault();
                  potentialActions.handleSwipe(userId, potentialId, 'no', index, lastPotential);
                }}
              >
                <img
                  src="../../../assets/img/reddit-sad.png"
                  alt="Reddit Logo with Sad Smile"
                  style={{ height: 50 }}
                />
              </button>
              <button
                onClick={e => {
                  e.preventDefault();
                  potentialActions.handleSwipe(userId, potentialId, 'yes', index, lastPotential);
                }}
              >
                <img
                  src="../../../assets/img/reddit-love.png"
                  alt="Reddit Logo with Heart Eyes"
                  style={{ height: 50 }}
                />
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Link to="/matchMaker">
              <i className="material-icons md-48 black">keyboard_arrow_left</i>
            </Link>
            <Link to="/matches">
              <i className="material-icons md-48 black">keyboard_arrow_right</i>
            </Link>
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
  noMatches: PropTypes.bool,
  userInfoFetched: PropTypes.bool,
};
