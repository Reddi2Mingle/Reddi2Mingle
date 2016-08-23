const initialState = [
  {
    redditID: '',
    name: 'Fetching matches...',
    photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
    common_subreddits: ['Fetching matches...'],
    messageUrl: '',
  },
];

export default (state = initialState, action) => {
  console.log('matches state is', state);
  switch (action.type) {
    case 'FETCH_MATCHES_FULFILLED': {
      return action.payload;
    }
    case 'PUSH_MATCH': {
      return [...state, action.payload];
    }
    default:
      return state;
  }
};
