const initialState = {
  fetched: false,
  fetching: false,
  notification: false,
  people: [{
    redditID: '',
    name: 'Fetching matches...',
    photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
    common_subreddits: ['Fetching matches...'],
    messageUrl: '',
  }],
};

export default (state = initialState, action) => {
  console.log('matches state is', state);
  switch (action.type) {
    case 'FETCH_MATCHES': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'FETCH_MATCHES_FULFILLED': {
      return {
        ...state,
        fetched: true,
        fetching: false,
        people: action.payload,
      };
    }
    case 'PUSH_MATCH': {
      return {
        ...state,
        people: [...state.people, action.payload],
        notification: true,
      };
    }
    case 'RESET_NOTIFICATION': {
      return {
        ...state,
        notification: false,
      };
    }
    default:
      return state;
  }
};
