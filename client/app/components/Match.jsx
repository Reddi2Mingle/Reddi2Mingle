import React, { PropTypes } from 'react';

const Match = ({ username, picUrl, subreddits, messageUrl }) => (
  <div>
    <h1>Think {username}'s hot?</h1>
    <img src={picUrl} style={{ display: 'block' }} />
    <button><a href={messageUrl}>Message Me!</a></button>
    <ul>
      {subreddits.map((subreddit) => (
        <li>{subreddit}</li>
      ))}
    </ul>
  </div>
);

Match.propTypes = {
  username: PropTypes.string.isRequired,
  picUrl: PropTypes.string.isRequired,
  subreddits: PropTypes.array.isRequired,
  messageUrl: PropTypes.string.isRequired,
};

export default Match;
