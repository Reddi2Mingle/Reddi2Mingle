import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';

export default class User extends Component {
  render() {
    const { name, picUrl, updatePicUrl } = this.props;
    return (
      <div>
        {name}'s Profile
        <Dropzone onDrop={(files) => {
          console.log(files);
          updatePicUrl(files[0].preview);
        } }>
          <div>Drag and drop your image here, or click to select files to upload.</div>
        </Dropzone>
        <img src={picUrl} ></img>
      </div>
    );
  }
}

User.propTypes = {
  name: PropTypes.string,
  updatePicUrl: PropTypes.func,
};
