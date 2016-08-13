import axios from 'axios';

export function incrementIndex() {
  return {
    type: 'INCREMENT_INDEX',
  };
}

function resetIndex() {
  return {
    type: 'RESET_INDEX',
  };
}

function requestPotentials() {
  return {
    type: 'FETCH_POTENTIALS',
  };
}

export function fetchPotentials(userId) {
  console.log('Fetching potentials!');
  return dispatch => {
    dispatch(requestPotentials());
    dispatch(resetIndex());
    axios.get('/potentials?redditId=' + userId)
      .then((response) => {
        console.log('fetchPotentials response.data: ', response.data);
        dispatch({ type: 'FETCH_POTENTIALS_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_POTENTIALS_REJECTED', payload: err });
      });
  };
}

function sendSwipe(userId, potentialId, swipe) {
  console.log('userId', userId, 'potentialId', potentialId, 'swipe', swipe);
  axios.post('/swipe', {
    redditId: userId,
    potentialId: potentialId,
    swipe: swipe,
  })
  .then((response) => {
    console.log('sendSwipe response is:', response);
  })
  .catch((err) => {
    console.log('sendSwipe error', err);
  });
}

export function handleSwipe(userId, potentialId, swipe, index, lastPotential) {
  return dispatch => {
    if (index === lastPotential) {
      dispatch(fetchPotentials(userId));
    } else {
      dispatch(incrementIndex());
    }
    sendSwipe(userId, potentialId, swipe);
  };
}
