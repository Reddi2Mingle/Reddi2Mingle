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

function initiateFetchPotentials() {
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
    dispatch(initiateFetchPotentials());
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

function sendSwipe(redditId, potentialId, swipe) {
  axios.post('/api/swipe', {
    redditId,
    potentialId,
    swipe,
  })
  .then((response) => {
    console.log('sendSwipe response is:', response);
  })
  .catch((err) => {
    console.log('sendSwipe error', err);
  });
}

export function pushMatch(match) {
  return {
    type: 'PUSH_MATCH',
    payload: match,
  };
}

export function handleSwipe(userId, potentialId, swipe, index, lastPotential, potential) {
  return dispatch => {
    if (index === lastPotential) {
      dispatch(fetchPotentials(userId));
    } else {
      dispatch(incrementIndex());
    }
    if (swipe === 'yes' && potential.interested === true) {
      dispatch(pushMatch(potential));
    }
    sendSwipe(userId, potentialId, swipe);
  };
}



