import React, { PropTypes } from 'react';

const RejectButton = ({ handleSwipe, userId, potentialId, index, lastPotential, animateComponent }) => (
  <div>
    <button
      onClick={e => {
        e.preventDefault();
        handleSwipe(userId, potentialId, 'no', index, lastPotential);
        animateComponent();
      }}
    >
      <img
        src="../../../assets/img/reddit-sad.png"
        alt="Reddit Logo with Sad Smile"
        style={{ height: 50 }}
      />
    </button>
  </div>
);

RejectButton.propTypes = {
  handleSwipe: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  potentialId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  lastPotential: PropTypes.number.isRequired,
  animateComponent: PropTypes.func.isRequired,
};

export default RejectButton;
