import React, { PropTypes } from 'react';

const Match = ({ username, picUrl, subreddits, messageUrl }) => (
  <div className="match-card">
    <img src={picUrl} className="small-profile-image" />
    <div className="match-info">
      <h3>{username}</h3>
      <div className="potential-more-info">
        <i className="material-icons md-48 orange">favorite</i>
        <span className="heart-text"> r/ </span>
        <div className="small-subreddit-list">
          <ul>
            {subreddits.map((subreddit) => (
              <span>{subreddit}</span>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <button className="message">
      <a href={messageUrl}>
        Direct Message
      </a>
    </button>
  </div>
);

Match.propTypes = {
  username: PropTypes.string.isRequired,
  picUrl: PropTypes.string.isRequired,
  subreddits: PropTypes.array.isRequired,
  messageUrl: PropTypes.string.isRequired,
};

export default Match;
