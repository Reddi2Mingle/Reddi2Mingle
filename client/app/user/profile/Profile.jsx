import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../stateless/Navigation';

const Profile = ({ name, photo }) => (
  <div>
    <Navbar />
    <div className="potential-view">
      <div className="profile-image">
        <img
          src={photo}
          alt="Redditor"
        />
      </div>
    </div>
    <div className="potential-info">
      <h3>{name}</h3>
      <div className="potential-more-info">
        <i className="material-icons md-48 orange">favorite</i>
        <span className="heart-text"> r/ </span>
        <ul className="subreddit-list">
          
        </ul>
      </div>
    </div>
    <button> <h2> Change your profile picture </h2> </button>
  </div>
);

const mapStateToProps = state => ({
  name: state.user.name,
  photo: state.user.photo,
  // subreddits: state.user.name,
});

export default connect(
  mapStateToProps
)(Profile);

Profile.propTypes = {
  name: PropTypes.string,
  photo: PropTypes.string,
  subreddits: PropTypes.array,
};
