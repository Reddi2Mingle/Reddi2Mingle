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

export function fetchPotentials(userId) {
  return dispatch => {
    dispatch(initiateFetchPotentials());
    dispatch(resetIndex());
    axios.get(`/api/potentials?redditId=${userId}`)
    .then(response => {
      dispatch({ type: 'FETCH_POTENTIALS_FULFILLED', payload: response.data });
    })
    .catch(err => {
      dispatch({ type: 'FETCH_POTENTIALS_REJECTED', payload: err });
    });
  };
}

export function pushMatch(match) {
  return {
    type: 'PUSH_MATCH',
    payload: match,
  };
}

export function handleSwipe(redditId, potentialId, swipe, index, lastPotential, potential) {
  return dispatch => {
    if (swipe === 'yes' && potential.interested === true) {
      dispatch(pushMatch(potential));
    }
    axios.post('/api/swipe', {
      redditId,
      potentialId,
      swipe,
    })
    .then(() => {
      if (index === lastPotential) {
        dispatch(fetchPotentials(redditId));
      } else {
        dispatch(incrementIndex());
      }
    })
    .catch(() => {});
  };
}



