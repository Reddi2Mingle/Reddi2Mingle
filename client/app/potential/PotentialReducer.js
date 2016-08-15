const initialState = {
  index: 0,
  fetching: false,
  fetched: false,
  error: null,
  people: [
    {
      redditId: '',
      name: '',
      photo: '',
      common_subreddits: ['', '', ''],
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
    case 'RESET_INDEX': {
      return {
        ...state,
        index: 0,
      };
    }
    case 'FETCH_POTENTIALS': {
      return {
        ...state,
        feching: true,
      };
    }
    case 'FETCH_POTENTIALS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        people: action.payload,
      };
    }
    case 'FETCH_POTENTIALS_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
      return state;
  }
};
