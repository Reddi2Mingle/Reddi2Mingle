import axios from 'axios';

export function incrementIndex() {
  return {
    type: 'INCREMENT_INDEX',
  };
}

function requestPotentials() {
  return {
    type: 'FETCH_POTENTIALS',
  };
}

export function fetchPotentials(redditId) {
  return dispatch => {
    dispatch(requestPotentials());
    axios.get('/potentials?redditId=' + redditId)
      .then((response) => {
        console.log('fetchPotentials response.data: ', response.data);
        dispatch({ type: 'FETCH_POTENTIALS_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_POTENTIALS_REJECTED', payload: err });
      });
  };
}
