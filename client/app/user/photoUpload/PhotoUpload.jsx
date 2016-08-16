import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';

export default class PhotoUpload extends Component {
  render() {
    const { name, picUrl, userActions } = this.props;
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
            {picUrl === '' ? null :
              <div>
                <img src={picUrl} />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

PhotoUpload.propTypes = {
  name: PropTypes.string,
  picUrl: PropTypes.string,
  userActions: PropTypes.object,
};
