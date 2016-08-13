import axios from 'axios';

function requestUser() {
  return {
    type: 'FETCH_USER',
  };
}

export function fetchUser(redditId) {
  return dispatch => {
    console.log('dispatching fetchUser!');
    dispatch(requestUser());
    axios.get('/dummyData?redditId=' + redditId)
      .then((response) => {
        console.log('Response received! ', response.data);
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
