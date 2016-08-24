import React, { PropTypes } from 'react';

const InterestButton = ({ handleSwipe, index, lastPotential, potential, socket, user, animateComponent }) => (
  <div>
    <button
      onClick={e => {
        e.preventDefault();
        handleSwipe(user.redditId, potential.redditId, 'yes', index, lastPotential, potential);
        if (potential.interested === true) {
          socket.emit('send new match', {
            senderId: user.redditId,
            receiverId: potential.redditId,
            userInfo: {
              redditId: user.redditId,
              name: user.name,
              photo: user.photo,
              common_subreddits: potential.common_subreddits,
            },
          });
        }
        animateComponent();
      }}
    >
      <img
        src="../../../assets/img/reddit-love.png"
        alt="Reddit Logo with Heart Eyes"
        style={{ height: 50 }}
      />
    </button>
  </div>
);

InterestButton.propTypes = {
  handleSwipe: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  lastPotential: PropTypes.number.isRequired,
  potential: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  animateComponent: PropTypes.func.isRequired,
};

export default InterestButton;
