const initialState = {
  index: 0,
  fetching: false,
  people: [
    {
      redditID: 'e3e2k235ei3',
      name: 'Tyler',
      photo: 'https://scontent.xx.fbcdn.net/v/t1.0-9/11047927_10153655602919178_241309560116044723_n.jpg?oh=7a50c394dd2027315f4b6d2ad9d85364&oe=5816B760',
      subreddits: ['LifeProTips', 'NSFW', 'DIY'],
    },
    {
      redditID: 'inie2n3kb5e',
      name: 'Dane',
      photo: 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/1000661_10203433418140595_1651588418_n.jpg?oh=df6b6f391b75e529b8b881b33f0b4d02&oe=58146CE1',
      subreddits: ['Mobile', 'LifeProTips', 'Cal Poly'],
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_INDEX': {
      return {
        ...state,
        index: state.index + 1,
      };
    }
    case 'FETCH_POTENTIALS': {
      return {
        ...state,
        feching: true,
      };
    }
    default:
      return state;
  }
};
