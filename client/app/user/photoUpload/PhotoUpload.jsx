import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class PhotoUpload extends Component {

  submitAction(event) {
    const { photo, redditId } = this.props;
    event.preventDefault();
    axios.post('/api/userInfo/addPhoto', {
      redditId,
      photo,
    })
    .then(() => {
      this.props.history.push('/');
    })
    .catch(() => {});
  }

  render() {
    const { userActions, photo } = this.props;
    if (photo.length > 2) {
      return (
        <div className="photo-drop-view">
          <h1> Oh hey, lookin' good there </h1>
          <div className="photo-drop-container">
            <img style={{ width: 500 }} src={photo} alt="profile" />
            <br />
            <button onClick={this.submitAction.bind(this)}>
              <h2> Join the Party </h2>
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="photo-drop-view">
        <h1> Show Off Your Best Shot </h1>
        <div className="photo-drop-container">
          <Dropzone
            onDrop={files => {
              userActions.handleImageUpload(files[0]);
            }}
            multiple={false}
            accept="image/*"
            className="dropzone"
            activeClassName="dropzone-active"
          >
            <h2>
              Drag and drop your favorite selfie here
            </h2>
          </Dropzone>
        </div>
      </div>
    );
  }
}

PhotoUpload.propTypes = {
  redditId: PropTypes.string,
  name: PropTypes.string,
  photo: PropTypes.string,
  userActions: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.array,
};
