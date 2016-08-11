const expect = require('chai').expect;
// import React from 'react/addons';
import * as potentialActions from '../client/app/actions/potentialActions';
import * as potentialTypes from '../client/app/reducers/potentialReducer';


describe('Default Test', () => {
  it('Hooray, you passed a test! You are now rocking the power of mocha and chai', function() {
    expect(true).to.be.true;
  });
});

describe('Client Components', () => {
  // beforeEach(function() {
  //   this.examplePeople = [
  //     { id: 1, name: "Waldo" },
  //     { id: 2, name: "Hercules" }
  //   ];

  //   let { TestUtils } = React.addons;
  // });
  describe('Potential Components', () => {
    it ('should change username of potential person', () => {
      const payload = 'John Smith';
      const expectedAction = {
        type: potentialTypes.UPDATE_USERNAME,
        payload
      }
      expect(potentialActions.updateUsername(payload)).to.equal(expectedAction);
    });
  });
});