import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';


export default class PhotoUpload extends Component {

  submitAction(event) {
    event.preventDefault();
    this.props.history.push('/matchMaker');
  }

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
            <button onClick={this.submitAction.bind(this)}>
              <h2> Redirect to MatchMaker </h2>
            </button>
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
