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
    axios.get(`/userInfo?redditId=${redditId}`)
      .then((response) => {
        dispatch({ type: 'FETCH_USER_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_USER_REJECTED', payload: err });
      });
  };
}

export function updatePicUrl(url) {
  console.log('updatePicUrl', url);
  return {
    type: 'UPDATE_PIC_URL',
    payload: url,
  };
}

export function handleImageUpload(file) {
  const upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);
  upload.end((err, response) => {
    if (err) {
      console.error(err);
    }

    if (response.body.secure_url !== '') {
      console.log('url', response.body.secure_url);
      updatePicUrl(response.body.secure_url);
    }
  });
}
