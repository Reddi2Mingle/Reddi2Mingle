import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Modal from 'boron/WaveModal';
import axios from 'axios';
import * as UserActions from '../UserActions';
import * as PotentialActions from '../../potential/PotentialActions';
import * as MatchesActions from '../../matches/MatchesActions';
import Navbar from '../../stateless/Navigation';
import { socket } from '../../socket';

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

  componentWillMount() {
    const redditId = sessionStorage.getItem('redditId');
    const {
      potentialActions,
      userActions,
      matchesActions,
      user,
      potentialsFetched,
      matchesFetched,
    } = this.props;

    // if this is the first time loading the app, fetch all userInfo, potentials, and matches
    if (!user.fetched) {
      userActions.fetchUser(redditId);
      socket.emit('save my id', redditId);
    }
    if (!potentialsFetched) {
      potentialActions.fetchPotentials(redditId);
    }
    if (!matchesFetched) {
      matchesActions.fetchMatches(redditId);
    }
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
    const { user } = this.props;
    axios.post('/api/userInfo/addPhoto', {
      redditId: user.redditId,
      photo: user.photo,
    })
    .then(response => {
      this.hideModal();
    });
  }

  render() {
    const { userActions, user } = this.props;
    return (
      <div>
        <Navbar />
        <div className="profile-view">
          <div className="profile-left">
            <div style={{ padding: '20px' }}>
              <div className="profile-image" onClick={this.showModal.bind(this)}>
                <img
                  src={user.photo}
                  alt="Redditor"
                />
              </div>
              <div className="profile-subreddits">
                <div className="heart">
                  <i className="material-icons md-48 orange">favorite</i>
                  <span className="heart-r"> r/ </span>
                </div>
                <div className="my-subreddits">
                  <ul>
                    {user.subreddits.map(sub => (
                      <span key={sub.id}>{sub}</span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-right">
            <div className="profile-section-lg">
              <div className="profile-row">
                <i className="material-icons md-48 white">face</i>
                <h1>{user.name}</h1>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    userActions.logout();
                  }}
                >
                  <h2> Logout </h2>
                </button>
              </div>
            </div>
            <div className="profile-section-med">
              <div className="column">
                <h2>Trophies</h2>
                <div className="profile-row">
                  <i className="material-icons md-48 white">star</i>
                  <h1>{user.trophyCount}</h1>
                </div>
              </div>
              <div className="column">
                <h2>Post Karma</h2>
                <div className="profile-row">
                  <i className="material-icons md-48 white">format_quote</i>
                  <h1>{user.postKarma}</h1>
                </div>
              </div>
              <div className="profile-row">
                <div className="column">
                  <h2>Comment</h2>
                  <h2>Karma</h2>
                </div>
                <div className="profile-row">
                  <i className="material-icons md-48 white">comment</i>
                  <h1>{user.commentKarma}</h1>
                </div>
              </div>
            </div>
            <div className="profile-section-sm">
              <div className="profile-row">
                <div className="column">
                  <h2># of People</h2>
                  <h2>Who Think</h2>
                  <h2>You're Hot</h2>
                </div>
                <div style={{marginLeft: '20px'}}>
                  <h1>{user.receivedUpvotes}</h1>
                </div>
              </div>
              <div className="profile-row">
                <div className="column">
                  <h2> Swipe </h2>
                  <h2> Stats </h2>
                </div>
                <div className="column">
                  <i className="material-icons md-48 white">thumb_up</i>
                  <i className="material-icons md-48 white">thumb_down</i>
                </div>
                <div className="column">
                  <h1> {user.deliveredUpvotes} </h1>
                  <h1> {user.deliveredDownvotes} </h1>
                </div>
              </div>
            </div>
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
              thumbnail
            >
              <h2 className="black"> Took a new selfie? Drop your new profile photo here </h2>
            </Dropzone>
            <button
              className="submit-photo"
              onClick={this.submitPhoto.bind(this)}
            > <h2> Submit Photo </h2> </button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  potentialsFetched: state.potentials.fetched,
  matchesFetched: state.matches.fetched,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(UserActions, dispatch),
  potentialActions: bindActionCreators(PotentialActions, dispatch),
  matchesActions: bindActionCreators(MatchesActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

Profile.propTypes = {
  user: PropTypes.object,
  potentialsFetched: PropTypes.bool,
  matchesFetched: PropTypes.bool,
  matches: PropTypes.object,
  userActions: PropTypes.object,
  potentialActions: PropTypes.object,
  matchesActions: PropTypes.object,
};
