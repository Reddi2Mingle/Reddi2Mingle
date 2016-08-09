const initialState = {
  redditID: 'e3e2k235ei3',
  username: 'Neil',
  picUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-9/621_587359599669_2374_n.jpg?oh=d27ee8341201840fab85bd7e9fafe8df&oe=58554BA7',
  subreddits: ['blackPeopleTwitter', 'NSFW', 'leatherDaddyLand'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USERNAME': {
      return { ...state, username: action.username };
    }
    default:
      return state;
  }
};
