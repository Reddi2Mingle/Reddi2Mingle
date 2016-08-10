const initialState = {
  redditID: 'e4e3k6i4em3k',
  username: 'Jen',
  picUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-9/13438871_10208696268978453_1392015277595705466_n.jpg?oh=ca631ff0a564a0b32a4359777894a0d1&oe=585F0466',
  matches: [{
    redditID: '',
    username: '',
    picUrl: '',
    subreddits: [],
    messageUrl: '',
  }],
};

export default (state = initialState, action) => {
  // switch (action.type) {
  //   case 'DO_SOMETHING': {
  //     return { ...state, fetching: true };
  //   }
  //   default:
  //     return state;
  // }
  return state;
};
