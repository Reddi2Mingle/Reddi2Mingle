import React, { PropTypes } from 'react';

const MaleButton = ({ className, onClick }) => (
  <span className={className} onClick={onClick}>
    <img
      src="../../../assets/img/mustache.png"
      alt="mustache"
    />
  </span>
);

MaleButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default MaleButton;
