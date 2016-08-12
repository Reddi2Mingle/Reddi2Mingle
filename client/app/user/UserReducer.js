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
      messageUrl: 'https://www.linkedin.com/msgToConns?displayCreate=&connId=127002602&goback=%2Enpv_AAkAAAeR5*5oBj6QjZ0FlpDYyszbSd1d*4GTkKsik_*1_*1_NAME*4SEARCH_D3Ov_*1_en*4US_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_tyah_*1_*1&trk=prof-0-sb-message-button',
    },
    {
      redditID: 'rsie34',
      username: 'Jeremy Toce',
      picUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/2/005/07d/3ed/24801ee.jpg',
      subreddits: ['Lydia', 'LeatherDaddyLand', 'Growth Spurts'],
      messageUrl: 'https://www.linkedin.com/msgToConns?displayCreate=&connId=70699564&goback=%2Enpv_AAkAAAQ2yiwBGi9YkWLvYwSkfG*5uihI7x1J8jyk_*1_*1_NAME*4SEARCH_OhvK_*1_en*4US_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_tyah_*1_*1&trk=prof-0-sb-message-button',
    },
    {
      redditID: '12en2e32e',
      username: 'Sunny Virk',
      picUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAMAAAAAJGVlNzYyYzMxLTllYmUtNDFlNy04ZTVmLWEzZmEyNzZjN2Q1MA.jpg',
      subreddits: ['curry kitchen', 'webpack nerds', 'pedicures'],
      messageUrl: 'https://www.linkedin.com/msgToConns?displayCreate=&connId=401581374&goback=%2Enpv_AAkAABfvpT4BAJPbMq0DeYUI7iwpuHAAZqlWYwY_*1_*1_NAME*4SEARCH_aJ8d_*1_en*4US_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_tyah_*1_*1&trk=prof-0-sb-message-button',
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PIC_URL': {
      return { ...state, picUrl: action.payload };
    }
    default:
      return state;
  }
};
