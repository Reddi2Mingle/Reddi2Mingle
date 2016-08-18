const token = localStorage.getItem('token');
let initialState;

if (token) {
  initialState = {
    redditId: token,
    name: '',
    photo: '',
    fetching: false,
    fetched: false,
    isAuthenticated: true,
    error: null,
  };
} else {
  initialState = {
    redditId: null,
    name: '',
    photo: '',
    fetching: false,
    fetched: false,
    isAuthenticated: false,
    error: null,
  };
}

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
        redditId: action.payload.redditId,
        name: action.payload.name,
        photo: action.payload.photo,
        matches: action.payload.matches,
        fetching: false,
        fetched: true,
        isAuthenticated: true,
      };
    }
    case 'FETCH_USER_REJECTED': {
      return { ...state, fetching: false, fetched: false, error: action.payload };
    }
    case 'LOGOUT_USER': {
      return { ...state, isAuthenticated: false };
    }
    default:
      return state;
  }
};
