import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';

export default class PhotoUpload extends Component {
  render() {
    const { name, picUrl } = this.props;
    return (
      <div className="photo-drop-view">
        <h1> Show Off Your Best Shot </h1>
        <div>
          <Dropzone
            onDrop={(files) => {
              console.log(files);
            }}
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
  name: PropTypes.string,
  userActions: PropTypes.object,
};
