import axios from 'axios';

function initiateFetchMatches() {
  return {
    type: 'FETCH_MATCHES',
  };
}

export function fetchMatches(userId) {
  return dispatch => {
    dispatch(initiateFetchMatches());
    axios.get(`/api/swipe/matches?redditId=${userId}`)
      .then(response => {
        dispatch({ type: 'FETCH_MATCHES_FULFILLED', payload: response.data });
      })
      .catch(err => {
        dispatch({ type: 'FETCH_MATCHES_REJECTED', payload: err });
      });
  };
}

export function resetNotification() {
  return {
    type: 'RESET_NOTIFICATION',
  };
}
