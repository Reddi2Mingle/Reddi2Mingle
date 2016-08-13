import React, { Component, PropTypes } from 'react';
import { fetchUser } from '../user/UserActions';

export default class Potential extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, location: { query }, userLoggedIn } = this.props;
    const redditId = query.redditId;
    console.log('UserLogginIn: ', userLoggedIn);
    if (!userLoggedIn) {
      dispatch(fetchUser(redditId));
    }
  }

  render() {
    const { name, photo, subreddits, isFetching } = this.props;
    return (
      <div>
      {isFetching ?
        <div>
          <h2>Loading...</h2>
        </div>
           :
        <div className="potential-view">
          <div className="potential-card">
            <img src={picUrl} className="full-profile-image" />
            <div className="potential-info">
              <h3>{username}</h3>
              <div className="potential-more-info">
                <i className="material-icons md-48 orange">favorite</i>
                <span className="heart-text"> r/ </span>
                <div className="subreddit-list">
                  <ul>
                    {subreddits.map((subreddit) => (
                      <span>{subreddit}</span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="swipe">
              <button>
                <img src="../../../assets/img/reddit-sad.png" alt="Reddit Logo with Sad Smile" style={{height: 50}}/>
              </button>
              <button>
                <img src="../../../assets/img/reddit-love.png" alt="Reddit Logo with Heart Eyes" style={{height: 50}}/>
              </button>
            </div>
          </div>
        </div>
      }
      </div>
    );
  }
}

Potential.propTypes = {
  name: PropTypes.string,
  redditId: PropTypes.string,
  photo: PropTypes.string,
  subreddits: PropTypes.array,
  changeName: PropTypes.func,
  dispatch: PropTypes.func,
  isFetching: PropTypes.bool,
};
