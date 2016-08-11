import React, { PropTypes } from 'react';
import Match from './Match';

const Matches = ({ matches }) => (
  <div>
   <h1>Matches</h1>
    {matches.map((match) => (
      <Match
        username={match.username}
        picUrl={match.picUrl}
        subreddits={match.subreddits}
        messageUrl={match.messageUrl}
      />
    ))}
  </div>
);

Matches.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    picUrl: PropTypes.string.isRequired,
    messageUrl: PropTypes.string.isRequired,
    subreddits: PropTypes.array.isRequired,
  }).isRequired),
};

export default Matches;
