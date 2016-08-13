import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';

export default class User extends Component {
  render() {
    const { name, picUrl, updatePicUrl } = this.props;
    return (
      <div className="photo-drop-view">
        <h1> Show Off Your Best Shot </h1>
        <div>
          <Dropzone onDrop={(files) => {
            console.log(files);
            updatePicUrl(files[0].preview);
          }} className="dropzone" activeClassName="dropzone-active">
            <h2>
              Drag and drop your favorite selfie here
            </h2>
          </Dropzone>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  name: PropTypes.string,
  updatePicUrl: PropTypes.func,
};
