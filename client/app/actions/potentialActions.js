export function addSubreddit(subreddit) {
  return {
    type: 'ADD_SUBREDDIT',
    payload: subreddit,
  };
}

export function updateUsername(name) {
  return {
    type: 'UPDATE_USERNAME',
    payload: name,
  };
}
