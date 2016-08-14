const neo4j = require('neo4j');
const db = new neo4j.GraphDatabase('http://neo4j:cake@localhost:7474');

module.exports = {
  likeResponse: (req, res) => {

    // params: redditId, potentialId, swipe (need from client)
    const user = req.body.redditId;
    const potential = req.body.potentialId;
    const swipe = req.body.swipe;

    //check potentialid's response to user. Swipe will either be [r: INTEREST {SWIPE: 'yes' || 'no'} ] 
    //if swipe left, designate two-way relationship of NOT_INTERESTED
    //if mutual like, set match -- possibly do cool front end thing to display mutual interest

    //Potential's response check
    db.cypher({
      query: `MATCH (potential:Person {redditId: ${potential}})-[r:INTEREST]-> (user:Person {redditId: ${user}}) RETURN r`
    }, (err, potentialswipe) => {
      if (err) {
        console.log('Error in finding potential interest for user');
      } else {
        console.log('potentialswipe', potentialswipe);
        //if there is no existing INTEREST relationship, create one way user-> INTEREST {LIKES:yes||no}->potential relationship
        if (potentialswipe.length === 0) {
          console.log('relationship does not yet exist. Creating now.');
          db.cypher({
              query: `MATCH (user:Person { redditId: ${user} })
              MERGE (potential:Person { redditId: ${potential} })
              CREATE UNIQUE (user)-[r:INTEREST {LIKE: ${swipe}}]->(potential)
              RETURN r;`
          }, (err, relationship) => {
            if (err) {
              console.log('Error in creating swipe response relationship:', err);
            } else {
              console.log('Interest relationship was created/returned:', relationship);
              res.send(relationship);
              // [
              //   {
              //     "r": {
              //       "_id": 87,
              //       "type": "INTEREST",
              //       "properties": {
              //         "LIKE": "yes"
              //       },
              //       "_fromId": 73,
              //       "_toId": 65
              //     }
              //   }
              // ]
            }
          });
        } 
        //otherwise, if there is an existing INTEREST relationship, check what potential selected (could be yes||no)
        //erase existing POTENTIAL and INTEREST relationships, then
        //if potential selected yes, create match.  if potential selected no, create relationship 
        else { //potential has already responded
          var u2swipe = potentialswipe[0].r.properties.LIKE;
          
          const matched = u2swipe === 'yes' && swipe === "'yes'";
          const rel = matched ? 'MATCH' : 'NEVER';
          
          console.log('Interest relationship for potential->user returns:', u2swipe,'MATCHED?',matched);
          // erase relationships and replace with two-way relationship to indicate they MATCHed or will NEVER match
          db.cypher({
              query: `MATCH (user:Person { redditId: ${user} })-[r:INTEREST|POTENTIAL]-(potential:Person {redditId: ${potential}})
                DELETE r
                MERGE (user)-[f: ${rel}]-(potential)
                RETURN f;`
          }, (err, relationshipMatchOrNever) => {
            if (err) {
              console.log('Error in liking response:', err);
            } else {
              console.log('Interest relationship was deleted. Created new:', relationshipMatchOrNever);
              res.send(relationshipMatchOrNever);
            }
          });
        }
      }
    });
    //Example response for 'MATCH' match
    // [
    //   {
    //     "f": {
    //       "_id": 88,
    //       "type": "MATCH",
    //       "properties": {},
    //       "_fromId": 65,
    //       "_toId": 73
    //     }
    //   }
    // ]

  }

}