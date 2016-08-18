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
    });
    this.props.history.push('/');
  }

  render() {
    const { userActions } = this.props;
    return (
      <div className="photo-drop-view">
        <h1> Show Off Your Best Shot </h1>
        <div>
          <Dropzone
            onDrop={(files) => {
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
          <div>
            <button onClick={this.submitAction}>
              <h2> Submit Photo </h2>
            </button>
          </div>
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
