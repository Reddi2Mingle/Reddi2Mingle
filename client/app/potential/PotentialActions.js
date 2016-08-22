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

function newMatchCreated() {
  return {
    type: 'NEW_MATCH_CREATED',
  };
}

export function fetchPotentials(userId) {
  return dispatch => {
    dispatch(requestPotentials());
    dispatch(resetIndex());
    axios.get(`/api/potentials?redditId=${userId}`)
    .then((response) => {
      dispatch({ type: 'FETCH_POTENTIALS_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_POTENTIALS_REJECTED', payload: err });
    });
  };
}

function sendSwipe(userId, potentialId, swipe) {
  axios.post('/api/swipe', {
    redditId: JSON.stringify(userId),
    potentialId: JSON.stringify(potentialId),
    swipe: JSON.stringify(swipe),
  })
  .then((response) => {
    console.log('sendSwipe response is:', response);
  })
  .catch((err) => {
    console.log('sendSwipe error', err);
  });
}

export function handleSwipe(userId, potentialId, swipe, index, lastPotential, potentialObj) {
  return dispatch => {
    if (index === lastPotential) {
      dispatch(fetchPotentials(userId));
    } else {
      dispatch(incrementIndex());
    }
    if (swipe === 'yes' && potentialObj.interested === true) {
      dispatch({
        type: 'PUSH_MATCH',
        payload: potentialObj,
      });
    }
    sendSwipe(userId, potentialId, swipe);
  };
}



