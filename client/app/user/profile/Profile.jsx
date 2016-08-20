import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import Modal from 'boron/WaveModal';
import * as UserActions from '../UserActions';
import * as PotentialActions from '../../potential/PotentialActions';
import Navbar from '../../stateless/Navigation';
import axios from 'axios';

// Individual styles for the modal, modal content, and backdrop
const modalStyle = {
  width: '50%',
};

const backdropStyle = {
  backgroundColor: 'black',
};

const contentStyle = {
  backgroundColor: 'white',
  height: '100%',
  textAlign: 'right',
  paddingBottom: '50px',
};


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changePhotoClicked: false,
    };
  }

  componentDidUpdate() {
    this.state.changePhotoClicked ? this.refs.modal.show() : this.refs.modal.hide();
  }

  showModal() {
    this.setState({
      changePhotoClicked: !this.state.changePhotoClicked,
    });
  }

  hideModal() {
    this.setState({
      changePhotoClicked: !this.state.changePhotoClicked,
    });
  }

  submitPhoto() {
    const { photo, redditId } = this.props;
    axios.post('/api/userInfo/addPhoto', {
      redditId,
      photo,
    })
    .then((response) => {
      console.log('photo submitted!', response);
      this.hideModal();
    });
  }

  render() {
    const { userActions, name, photo } = this.props;
    return (
      <div>
        <Navbar />
        <div className="profile-view">
          <div style={{ padding: '20px' }}>
            <div className="profile-image" onClick={this.showModal.bind(this)}>
              <img
                src={photo}
                alt="Redditor"
              />
            </div>
            <div className="potential-more-info">
              <i className="material-icons md-48 orange">favorite</i>
              <span className="heart-text"> r/ </span>
              <div className="subreddit-list white">
                <ul>
                  <span> AskReddit </span>
                  <span> IamA </span>
                  <span> technology </span>
                  <span> ELI5 </span>
                  <span> hackreactor </span>
                </ul>
              </div>
            </div>
          </div>
          <span style={{ flex: 0.1 }}> </span>
          <div style={{ padding: '20px' }}>
            <h2>{name}</h2>
          </div>
        </div>
        <Modal ref="modal"
          modalStyle={modalStyle}
          backdropStyle={backdropStyle}
          contentStyle={contentStyle}
          keyboard={this.callback}
        >
          <i className="material-icons md-48 orange" onClick={this.hideModal.bind(this)}>clear</i>
          <div className="photo-drop-container">
            <Dropzone
              onDrop={(files) => {
                userActions.handleImageUpload(files[0]);
              }}
              multiple={false}
              accept="image/*"
              className="change-photo"
              thumbnail            >
              <h2 className="black"> Took a new selfie? Drop your new profile photo here </h2>
            </Dropzone>
            <button className="submit-photo" onClick={this.submitPhoto.bind(this)}> <h2> Submit Photo </h2> </button> 
          </div>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  redditId: state.user.redditId,
  name: state.user.name,
  photo: state.user.photo,
  // subreddits: state.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(UserActions, dispatch),
  potentialActions: bindActionCreators(PotentialActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

Profile.propTypes = {
  redditId: PropTypes.string,
  name: PropTypes.string,
  photo: PropTypes.string,
  subreddits: PropTypes.array,
  userActions: PropTypes.object,
};
