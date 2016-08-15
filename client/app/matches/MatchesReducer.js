const initialState = [
  {
    redditID: '',
    name: '',
    photo: '',
    subreddits: [],
    messageUrl: '',
  },
];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MATCHES_FULFILLED': {
      return action.payload;
    }
    default:
      return state;
  }
};
