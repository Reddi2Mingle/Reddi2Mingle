import axios from 'axios';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'snuivfbx';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dkzcwlehr/image/upload';

function requestUser() {
  return {
    type: 'FETCH_USER',
  };
}

export function fetchUser(redditId) {
  return dispatch => {
    dispatch(requestUser());
    axios.get(`/api/userInfo?redditId=${redditId}`)
      .then(response => {
        dispatch({ type: 'FETCH_USER_FULFILLED', payload: JSON.parse(response.data.body) });
      })
      .catch(err => {
        dispatch({ type: 'FETCH_USER_REJECTED', payload: err });
      });
  };
}

export function saveRedditId(redditId) {
  return {
    type: 'SAVE_REDDITID',
    payload: redditId,
  };
}

export function userLogin(username, password) {
  return dispatch => {
    dispatch(requestUser());
    axios.post('/api/userInfo/loginCredentials', {
      username,
      password,
    })
    .then(response => {
      dispatch({ type: 'USER_LOGIN_FULFILLED', payload: { redditId: response.data } });
    })
    .catch(err => {
      dispatch({ type: 'FETCH_USER_REJECTED', payload: err });
    });
  };
}

export function logout() {
  sessionStorage.removeItem('redditId');
  return {
    type: 'LOGOUT_USER',
  };
}

export function handleImageUpload(file) {
  console.log('handleImageUpload accessed', file);
  const upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);
  return dispatch => {
    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        dispatch({ type: 'UPDATE_PIC_URL', payload: response.body.secure_url });
      }
    });
  };
}

