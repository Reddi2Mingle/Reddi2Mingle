import axios from 'axios';

export function incrementIndex() {
  return {
    type: 'INCREMENT_INDEX',
  };
}

function requestUser() {
  return {
    type: 'FETCH_POTENTIALS',
  };
}

export function fetchPotentials(redditId) {
  return dispatch => {
    dispatch(requestUser());
    axios.get('/potentials?redditId=' + redditId)
      .then((response) => {
        dispatch({ type: 'FETCH_POTENTIALS_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_POTENTIALS_REJECTED', payload: err });
      });
  };
}
