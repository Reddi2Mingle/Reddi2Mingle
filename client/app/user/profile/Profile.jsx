import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'boron/OutlineModal';
import Navbar from '../../stateless/Navigation';
// import changePhotoModal from '../../stateless/Modals';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changePhotoClicked: false,
    };
  }

  componentDidUpdate() {
    this.state.changePhotoClicked ? this.refs.modal.show() : this.refs.modal.hide();
  }

  showModal() {
    this.setState({
      changePhotoClicked: !this.state.changePhotoClicked,
    });
    // console.log('toggleModal changing state', this.state.changePhotoClicked);
    // if (this.state.changePhotoClicked) {
    //   console.log('modal showing accessed');
    //   this.refs.modal.show();
    // }
  }

  hideModal() {
    this.setState({
      changePhotoClicked: !this.state.changePhotoClicked,
    });
  }

  render() {
    const { name, photo } = this.props;
    return (
      <div>
        <Navbar />
        <div className="profile-view">
          <div style={{ padding: '20px' }}>
            <div className="profile-image" onClick={this.showModal.bind(this)}>
              <img
                src={photo}
                alt="Redditor"
              />
            </div>
            <Modal ref="modal" keyboard={this.callback}>
                <h2>I am a dialog</h2>
                <button onClick={this.hideModal.bind(this)}>Close</button>
            </Modal>
            <div className="potential-more-info">
              <i className="material-icons md-48 orange">favorite</i>
              <span className="heart-text"> r/ </span>
              <div className="subreddit-list white">
                <ul>
                  <span> AskReddit </span>
                  <span> IamA </span>
                  <span> technology </span>
                  <span> ELI5 </span>
                  <span> hackreactor </span>
                </ul>
              </div>
            </div>
          </div>
          <span style={{ flex: 0.1 }}> </span>
          <div style={{ padding: '20px' }}>
            <h2>{name}</h2>
            
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  name: state.user.name,
  photo: state.user.photo,
  // subreddits: state.user.name,
});

export default connect(
  mapStateToProps
)(Profile);

Profile.propTypes = {
  name: PropTypes.string,
  photo: PropTypes.string,
  subreddits: PropTypes.array,
};
