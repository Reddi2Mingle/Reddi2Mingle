import React, { PropTypes } from 'react';

const Potential = ({ username, picUrl, subreddits, changeName }) => (
  <div>
    <h1>Think {username}'s hot?</h1>
    <img src={picUrl} style={{ display: 'block' }} />
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
    <button
      onClick={e => {
        e.preventDefault();
        changeName();
      }}
    >Change name to Tyler</button>
  </div>
);

Potential.propTypes = {
  username: PropTypes.string,
  picUrl: PropTypes.string,
  subreddits: PropTypes.array,
  changeName: PropTypes.func,
};

export default Potential;
