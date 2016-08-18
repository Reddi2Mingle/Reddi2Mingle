import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class PhotoUpload extends Component {

  componentWillMount() {
    const { potentialActions, userActions, location: { query } } = this.props;
    const redditId = query.redditId;
    localStorage.setItem('token', redditId);
    potentialActions.fetchPotentials(redditId);
    userActions.fetchUser(redditId);
  }

  submitAction(event) {
    const { photo, location: { query } } = this.props;
    event.preventDefault();
    console.log('photo: ', photo);
    axios.post('/api/userInfo/addPhoto', {
      redditId: query.redditId,
      photo,
    });
    this.props.history.push('/');
  }

  saveToken(redditId) {
    localStorage.setItem('token', redditId);
  }

  render() {
    const { name, photo, userActions } = this.props;
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
  potentialActions: PropTypes.object,
  location: PropTypes.object,
};
