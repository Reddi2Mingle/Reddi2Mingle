import React, { PropTypes } from 'react';

const InterestButton = ({ handleSwipe, userId, potentialId, index, lastPotential, potentialObj }) => (
  <div>
    <button
      onClick={e => {
        e.preventDefault();
        handleSwipe(userId, potentialId, 'yes', index, lastPotential, potentialObj);
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
  userId: PropTypes.string.isRequired,
  potentialId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  lastPotential: PropTypes.number.isRequired,
  potentialObj: PropTypes.object.isRequired,
};

export default InterestButton;
