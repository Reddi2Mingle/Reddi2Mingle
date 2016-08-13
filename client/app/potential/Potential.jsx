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
        <div>
          <h1>Think {name}'s hot?</h1>
          <img src={photo} style={{ display: 'block' }} />
          <button type="submit" style={{ border: 0, background: 'transparent', display: 'inline-block' }}>
            <img src="http://www.clker.com/cliparts/0/7/e/a/12074327311562940906milker_X_icon.svg.med.png" width="50" height="50" />
          </button>
          <button type="submit" style={{ border: 0, background: 'transparent', display: 'inline-block' }}>
            <img src="http://www.clker.com/cliparts/k/m/w/n/Q/D/green-heart-md.png" width="50" height="50" />
          </button>
          <ul>
            {subreddits.map((subreddit) => (
              <li>{subreddit}</li>
            ))}
          </ul>
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
