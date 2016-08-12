const neo4j = require('neo4j');
const db = require('../db/config');


module.exports = {
  likeResponse: (redditId, potentialId, swipe) => {
    //check first if potentialId.  swipe will either be 'interested_in'

    db.cypher({
        query: `MATCH (p2:Person { redditId: ${potentialId} })-[r:SWIPE]->(p1:Person { redditId: ${redditId} }) 
          RETURN p1, p2, r.like`,
        params: {
          user1: redditId,
          user2: potentialId,
          swipe: swipe
        }
    }, function (err, results) {
        if (err) {
          console.log("Error with processing swipe response: ",err)
        } else {
          console.log('Obj containing user, potential match, and response from potential (if any):', results);
        }
    });
    //add one way relationship to potential id indicating like response
    db.cypher({
        query: '',
        params: {
          user1: redditId,
          user2: potentialId,
          swipe: swipe
        }
    }, function (err, results) {
        if (err) {
          console.log("issue with; ",err)
        } else {
          console.log('list of potentials', results);
        }
    });
    //check potentialid's response to user
    //if swipe left, designate two-way relationship of NOT_INTERESTED
    //if mutual like, set match -- possibly do cool front end thing to display mutual interest
  }


}