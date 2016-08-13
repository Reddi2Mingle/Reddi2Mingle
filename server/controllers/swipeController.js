const neo4j = require('neo4j');
const db = new neo4j.GraphDatabase('http://neo4j:cake@localhost:7474');

module.exports = {
  likeResponse: (req, res) => {
    // params: redditId, potentialId, swipe (need from client)
    let r = req.query;

    let user = r.redditId;
    let potential = r.potentialId;
    let swipe = r.swipe;

    //check potentialid's response to user. Swipe will either be [r: INTEREST {SWIPE: 'yes' || 'no'} ] 
    //if swipe left, designate two-way relationship of NOT_INTERESTED
    //if mutual like, set match -- possibly do cool front end thing to display mutual interest

    //Potential's response check
    db.cypher({
      query: `MATCH (potential:Person {redditId: ${potential}})-[r:INTEREST]-> (user:Person {redditId: ${user}}) RETURN r`
    }, function(err, potentialswipe) {
      if (err) {
        console.log('Error in finding potential interest for user');
      } else {
        console.log('potentialswipe',potentialswipe)
        //if there is no existing INTEREST relationship, create one way user-> INTEREST {LIKES:yes||no}->potential relationship
        if (potentialswipe.length === 0) {
          console.log('relationship does not yet exist. Creating now.')
          db.cypher({
              query: `MATCH (user:Person { redditId: ${user} })
              MERGE (potential:Person { redditId: ${potential} })
              CREATE UNIQUE (user)-[r:INTEREST {LIKE: ${swipe}}]->(potential)
              RETURN r;`
          }, function(err, relationship) {
            if (err) {
              console.log('Error in creating swipe response relationship:',err);
            } else {
              console.log('Interest relationship was created/returned:',relationship);
              res.send(relationship)
            }
          });
        } 
        //otherwise, if there is an existing INTEREST relationship, check what potential selected (could be yes||no)
        //erase existing POTENTIAL and INTEREST relationships, then
        //if potential selected yes, create match.  if potential selected no, create relationship 
        else { //potential has already responded
          var u2swipe = potentialswipe[0].r.properties.LIKE;
          
          let matched = u2swipe === 'yes' && swipe === "'yes'";
          let rel = matched ? 'MATCH' : 'NEVER';
          
          console.log('Interest relationship for potential->user returns:',u2swipe,'MATCHED?',matched);
          // erase relationships and replace with two-way relationship to indicate they MATCHed or will NEVER match
          db.cypher({
              query: `MATCH (user:Person { redditId: ${user} })-[r:INTEREST|POTENTIAL]-(potential:Person {redditId: ${potential}})
                DELETE r
                MERGE (user)-[f: ${rel}]-(potential)
                RETURN f, user, potential;`
          }, function(err, results) {
            if (err) {
              console.log('Error in liking response:',err);
            } else {
              console.log('Interest relationship was deleted. Created new:',results);
              res.send(results);
            }
          });
        }
      }
    })
    //Example response for 'NEVER' match
    // [
    //   {
    //     "f": {
    //       "_id": 36,
    //       "type": "NEVER",
    //       "properties": {},
    //       "_fromId": 18,
    //       "_toId": 15
    //     },
    //     "user": {
    //       "_id": 18,
    //       "labels": [
    //         "Person"
    //       ],
    //       "properties": {
    //         "name": "Jay Arella",
    //         "photo": "https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png",
    //         "redditId": "7"
    //       }
    //     },
    //     "potential": {
    //       "_id": 15,
    //       "labels": [
    //         "Person"
    //       ],
    //       "properties": {
    //         "name": "Trevor Healy",
    //         "photo": "https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png",
    //         "redditId": "5"
    //       }
    //     }
    //   }
    // ]

  }

}