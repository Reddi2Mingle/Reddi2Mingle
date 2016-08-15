import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { fetchUser } from '../user/UserActions';
import { fetchPotentials, handleSwipe } from './PotentialActions';

export default class MatchMaker extends Component {

  componentWillMount() {
    const { dispatch, location: { query }, userLoggedIn } = this.props;
    const redditId = query.redditId;
    dispatch(fetchPotentials(redditId));
    console.log('UserLogginIn: ', userLoggedIn);
    if (!userLoggedIn) {
      dispatch(fetchUser(redditId));
    }
  }

  render() {
    const {
      name,
      potentialId,
      userId,
      photo,
      common_subreddits,
      fetchingUser,
      fetchingPotentials,
      dispatch,
      index,
      lastPotential,
    } = this.props;
    return (
      <div>
      {fetchingUser || fetchingPotentials ?
        <div>
          <h2>Loading...</h2>
        </div>
           :
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
                <div className="subreddit-list">
                  {common_subreddits.map(sub => (
                    <li>{sub}</li>
                  ))}
                </div>
              </div>
            </div>

            <div className="swipe">
              <button
                onClick={e => {
                  e.preventDefault();
                  dispatch(handleSwipe(userId, potentialId, 'no', index, lastPotential));
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
                  dispatch(handleSwipe(userId, potentialId, 'yes', index, lastPotential));
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
      }
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
  changeName: PropTypes.func,
  dispatch: PropTypes.func,
  fetchingUser: PropTypes.bool,
  fetchingPotentials: PropTypes.bool,
  userLoggedIn: PropTypes.bool,
  index: PropTypes.number,
  lastPotential: PropTypes.number,
};
