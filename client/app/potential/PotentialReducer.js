const initialState = {
  redditID: 'e3e2k235ei3',
  name: 'Neil',
  photo: 'https://scontent.xx.fbcdn.net/v/t1.0-9/11047927_10153655602919178_241309560116044723_n.jpg?oh=7a50c394dd2027315f4b6d2ad9d85364&oe=5816B760',
  subreddits: ['blackPeopleTwitter', 'NSFW', 'leatherDaddyLand'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USERNAME': {
      return { ...state, name: action.payload };
    }
    case 'ADD_SUBREDDIT': {
      return {
        ...state,
        subreddits: [...state.subreddits, action.payload],
      };
    }
    default:
      return state;
  }
};
