const initialState = {
  redditID: null,
  name: '',
  photo: '',
  matches: [],
  fetching: false,
  fetched: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PIC_URL': {
      return { ...state, photo: action.payload };
    }
    case 'FETCH_USER': {
      return { ...state, fetching: true };
    }
    case 'FETCH_USER_FULFILLED': {
      return {
        ...state,
        redditID: action.payload.redditID,
        name: action.payload.name,
        photo: action.payload.photo,
        matches: action.payload.matches,
        fetching: false,
        fetched: true,
      };
    }
    case 'FETCH_USER_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
      return state;
  }
};
