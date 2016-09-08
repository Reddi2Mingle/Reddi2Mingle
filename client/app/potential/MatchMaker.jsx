import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import Navbar from '../stateless/Navigation';
import RejectButton from './RejectButton';
import InterestButton from './InterestButton';
import { socket } from '../socket';

export default class MatchMaker extends Component {

  componentWillMount() {
    const {
      potentialActions,
      userActions,
      matchesActions,
      user,
      matchesFetched,
      potentialsFetched,
    } = this.props;
    const redditId = sessionStorage.getItem('redditId') || user.redditId;

    // if the user came through the login page, we set the token here
    if (sessionStorage.getItem('redditId') === null) {
      sessionStorage.setItem('redditId', user.redditId);
    }
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

    this.state = {
      yes: false,
      no: false,
    };
  }

  componentWillReceiveProps() {
    // every time a button is clicked, state will change and animate
    // this setTimeout will reset the state after one second and bring the card back to center
    setTimeout(() => {
      this.setState({
        yes: false,
        no: false,
      });
    }, 400);
  }

  animateComponent(swipe) {
    if (swipe === 'yes') {
      this.setState({ yes: true });
    } else if (swipe === 'no') {
      this.setState({ no: true });
    }
  }

  animateDirection() {
    if (this.state.yes) {
      return 2000;
    } else if (this.state.no) {
      return -2000;
    }
    return 0;
  }

  render() {
    const {
      user,
      potential,
      fetchingPotentials,
      potentialActions,
      index,
      lastPotential,
      noPotentials,
    } = this.props;
    if (fetchingPotentials) {
      return (
        <div>
          <Navbar />
          <div className="matchmaker-view">
            <img src="../../../assets/img/heart.gif" alt="beating heart gif" />
            <h2>Hold on, we're getting you ready to mingle</h2>
          </div>
        </div>
      );
    }
    if (noPotentials) {
      return (
        <div>
          <Navbar />
          <div className="matchmaker-view">
            <h2>Oh no! We don't have anyone for you to mingle with.</h2>
            <h2>Please check back in a bit.</h2>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <div className="matchmaker-view">
          <div className="matchmaker-container">
            <Motion
              defaultStyle={{ x: 0 }}
              style={{ x: spring(this.animateDirection(),
                { stiffness: 330, damping: 100, precision: 0.1 }) }}
            >
              {({ x }) =>
                <div
                  className="matchmaker-card"
                  style={{
                    WebkitTransform: `translate3d(${x}px, 0, 0) rotate(${x}deg)`,
                    transform: `translate3d(${x}px, 0, 0) rotate(${x}deg)` }}
                >
                  <div className="small-profile-wrapper">
                    <img
                      src={potential.photo}
                      className="small-profile-image"
                      alt="Redditor"
                    />
                  </div>
                  <div className="matchmaker-info">
                    <h3>{potential.name}</h3>
                    <div className="matchmaker-more-info">
                      <i className="material-icons md-48 orange">favorite</i>
                      <span className="heart-text"> r/ </span>
                      <div className="subreddit-list">
                        <ul>
                          {potential.common_subreddits.map(sub => (
                            <span key={sub.id}>{sub}</span>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </Motion>
            <div className="swipe">
              <RejectButton
                handleSwipe={potentialActions.handleSwipe}
                userId={user.redditId}
                potentialId={potential.redditId}
                index={index}
                lastPotential={lastPotential}
                animateComponent={this.animateComponent.bind(this, 'no')}
              />
              <InterestButton
                handleSwipe={potentialActions.handleSwipe}
                userId={user.redditId}
                index={index}
                lastPotential={lastPotential}
                potential={potential}
                socket={socket}
                user={user}
                animateComponent={this.animateComponent.bind(this, 'yes')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MatchMaker.propTypes = {
  user: PropTypes.object,
  potential: PropTypes.object,
  userActions: PropTypes.object,
  potentialActions: PropTypes.object,
  matchesActions: PropTypes.object,
  fetchingPotentials: PropTypes.bool,
  matchesFetched: PropTypes.bool,
  potentialsFetched: PropTypes.bool,
  index: PropTypes.number,
  lastPotential: PropTypes.number,
  noPotentials: PropTypes.bool,
};
