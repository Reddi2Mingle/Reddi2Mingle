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
        subreddits: action.payload.subreddits,
        trophyCount: action.payload.trophyCount,
        postKarma: action.payload.postKarma,
        commentKarma: action.payload.commentKarma,
        goldMember: action.payload.goldMember,
        receivedUpvotes: action.payload.receivedUpvotes,
        deliveredUpvotes: action.payload.deliveredUpvotes,
        deliveredDownvotes: action.payload.deliveredDownvotes,
        fetching: false,
        fetched: true,
        isAuthenticated: true,
      };
    }
    case 'FETCH_USER_REJECTED': {
      return { ...state, fetching: false, fetched: false, error: action.payload };
    }
    case 'USER_LOGIN_FULFILLED': {
      return {
        ...state,
        redditId: action.payload.redditId,
        name: action.payload.name,
        photo: action.payload.photo,
        fetching: false,
        fetched: false,
        isAuthenticated: true,
      };
    }
    case 'LOGOUT_USER': {
      return { ...state, isAuthenticated: false, fetched: false };
    }
    case 'SAVE_REDDITID': {
      return { ...state, redditId: action.payload };
    }
    default:
      return state;
  }
};
