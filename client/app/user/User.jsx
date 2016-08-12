import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  onDrop(files) {
    console.log('Received files: ', files);
  }

  render() {
    return (
      <div>
        {this.props.username}'s Profile
        <Dropzone onDrop={this.onDrop}>
          <div>Drag and drop your image here, or click to select files to upload.</div>
        </Dropzone>
      </div>
    );
  }
}

User.propTypes = {
  username: PropTypes.string,
};

export default User;
