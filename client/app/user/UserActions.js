export function fetchUser() {
  return {
    type: 'FETCH_USER_FULFILLED',
    payload: {
      name: 'Will',
      age: 35,
    },
  };
}

export function updateUsername(name) {
  return {
    type: 'UPDATE_USERNAME',
    payload: name,
  };
}
