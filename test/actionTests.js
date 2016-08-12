import expect from 'expect';
import { addSubreddit, updateUsername } from '../client/app/potential/PotentialActions';


describe('Default Test', () => {
  it('Hooray, you passed a test! You are now rocking all the coffee power', () => {
    expect(true).toBe(true);
  });
});

describe('Client Components', () => {
  describe('Potential Components', () => {
    it ('should change username of potential person', () => {
      const payload = 'John Smith';
      const expectedAction = {
        type: 'UPDATE_USERNAME',
        payload: payload,
      };
      expect(updateUsername(payload)).toEqual(expectedAction);
    });
  });
});
