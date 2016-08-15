const initialState = [
  {
    redditID: '',
    name: 'Fetching matches...',
    photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
    subreddits: ['Fetching matches...'],
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
