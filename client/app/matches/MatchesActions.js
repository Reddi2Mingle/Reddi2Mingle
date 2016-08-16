import axios from 'axios';

export function fetchMatches(userId) {
  console.log('Fetching matches!');
  return dispatch => {
    axios.get(`/api/swipe/matches?redditId=${userId}`)
      .then((response) => {
        console.log(`fetchMatches response.data: ${response.data}`);
        dispatch({ type: 'FETCH_MATCHES_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        console.log('error fetching matches!');
        dispatch({ type: 'FETCH_MATCHES_REJECTED', payload: err });
      });
  };
}
