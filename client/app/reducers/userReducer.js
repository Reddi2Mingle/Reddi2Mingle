const initialState = {
  redditID: 'e4e3k6i4em3k',
  username: 'Jen',
  picUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-9/13438871_10208696268978453_1392015277595705466_n.jpg?oh=ca631ff0a564a0b32a4359777894a0d1&oe=585F0466',
  matches: [
    {
      redditID: 'rshiei4n4',
      username: 'Casper Holmgreen',
      picUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAhtAAAAJDNkM2M5YjdmLWYxZTUtNDg1MS04N2EwLTYyYjlmYTYxYzY1ZQ.jpg',
      subreddits: ['Office Depot', 'Dog Mania', 'Math all over me'],
      messageUrl: 'https://www.linkedin.com/in/casperholmgreen',
    },
    {
      redditID: 'rsie34',
      username: 'Jeremy Toce',
      picUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/2/005/07d/3ed/24801ee.jpg',
      subreddits: ['Lydia', 'LeatherDaddyLand', 'Growth Spurts'],
      messageUrl: 'https://www.linkedin.com/in/jeremytoce',
    },
    {
      redditID: '12en2e32e',
      username: 'Sunny Virk',
      picUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAMAAAAAJGVlNzYyYzMxLTllYmUtNDFlNy04ZTVmLWEzZmEyNzZjN2Q1MA.jpg',
      subreddits: ['curry kitchen', 'webpack nerds', 'pedicures'],
      messageUrl: 'https://www.linkedin.com/in/sunnysvirk',
    },
  ],
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
