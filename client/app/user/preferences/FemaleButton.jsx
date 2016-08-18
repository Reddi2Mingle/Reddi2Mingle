import React, { PropTypes } from 'react';

const FemaleButton = ({ className, onClick }) => (
  <span className={className} onClick={onClick}>
    <img
      src="../../../assets/img/lips.png"
      alt="lips"
    />
  </span>
);

FemaleButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default FemaleButton;
