import React, { PropTypes } from 'react';

const Match = ({ name, photo }) => (
  <div className="match-card">
    <img src={photo} className="small-profile-image" />
    <div className="match-info">
      <h3>{name}</h3>
      <div className="potential-more-info">
        <i className="material-icons md-48 orange">favorite</i>
        <span className="heart-text"> r/ </span>
        <div className="small-subreddit-list">
          <ul>

          </ul>
        </div>
      </div>
    </div>
    <button className="message">
      <a href="http://www.google.com">  Direct Message </a>
    </button>
  </div>
);

Match.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

export default Match;
