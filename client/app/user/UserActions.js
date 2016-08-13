import axios from 'axios';

function requestUser() {
  return {
    type: 'FETCH_USER',
  };
}

export function fetchUser(redditId) {
  return dispatch => {
    dispatch(requestUser());
    axios.get('/userInfo?redditId=' + redditId)
      .then((response) => {
        dispatch({ type: 'FETCH_USER_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_USER_REJECTED', payload: err });
      });
  };
}

export function updatePicUrl(url) {
  return {
    type: 'UPDATE_PIC_URL',
    payload: url,
  };
}
