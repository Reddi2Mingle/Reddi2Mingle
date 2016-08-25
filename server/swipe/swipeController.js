'use strict';

const db = require('../db/neo4jconfig').db;
const request = require('request');

module.exports = {
  likeResponse: (req, res) => {
    const user = req.body.redditId;
    const potential = req.body.potentialId;
    const swipe = req.body.swipe;

    // Send the downvote / upvote data to user service
    // User service will increment the upvote / downvote in MySQL
    // When user swipes yes or no, both an upvote and a downvote count are recorded
    // The upvote and downvote are mutually exclusive (one will be zero and the other equal to 1)
    // This is being done so that the post request is in a consistent format regardless of decision
    const deliveredUpvotes = swipe === 'yes' ? 1 : 0;
    const deliveredDownvotes = swipe === 'yes' ? 0 : 1;
    request({
      url: `http://${process.env.HOST}:${process.env.PORT_USER}/api/user-sql/saveVotes`,
      method: 'POST',
      form: {
        deliveredUpvotes,
        deliveredDownvotes,
        potentialRedditId: potential,
        userRedditId: user,
      },
    }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
      }
    });

    // Check if there is an INTEREST relationship between the user and potential
    db.cypher({
      query: `MATCH (potential:Person {redditId: "${potential}"})-[r:INTEREST]-
                (user:Person {redditId: "${user}"})
              RETURN r;`,
    }, (err, potentialswipe) => {
      if (err) {
        console.log('Error in finding potential interest for user');
      } else if (potentialswipe.length === 0) {
        // if there is no existing INTEREST relationship,
        // create one way relationship of INTEREST or NEVER
        const rel = swipe === 'yes' ? 'INTEREST' : 'NEVER';
        db.cypher({
          query: `MATCH (user:Person {redditId: "${user}"})-
                    [p:POTENTIAL]-(potential:Person {redditId: "${potential}"})
                  DELETE p
                  MERGE (user)-[f: ${rel}]->(potential)
                  RETURN f;`,
        }, (error, relationship) => {
          if (error) {
            console.log('Error in creating swipe response relationship:', err);
          } else {
            res.send(relationship);
          }
        });
        // otherwise, if there is an existing INTEREST relationship, delete it
        // and create MATCH or NEVER relationship, depending on the swipe
      } else {
        const rel = swipe === 'yes' ? 'MATCH' : 'NEVER';
        db.cypher({
          query: `MATCH (user:Person { redditId: "${user}" })-
                    [i:INTEREST]-(potential:Person {redditId: "${potential}"})
                  DELETE i
                  MERGE (user)-[f: ${rel}]-(potential)
                  RETURN f;`,
        }, (error, relationshipMatchOrNever) => {
          if (err) {
            console.log('Error in liking response:', err);
          } else {
            res.send(relationshipMatchOrNever);
          }
        });
      }
    });
  },


  showMatches: (req, res) => {
    const redditId = req.query.redditId;

    db.cypher({
      query: `MATCH (user:Person {redditId: "${redditId}"})-[r:MATCH]-(matched:Person) 
              MATCH (user)-[:FOLLOWS]->(sub:Subreddit)<-[:FOLLOWS]-(matched)
              RETURN matched, sub;`,
    }, (err, results) => {
      if (err) {
        console.log('Error in finding potential interest for user:', err);
        res.send([]);
      } else {
        // first we have to sift through the results returned, because it returns
        // an array containing objects for each subreddit and person
        const mappedResults = {};
        for (let result of results) {
          let person = result.matched.properties;
          let sub = result.sub.properties;
          if (mappedResults[person.name]) {
            mappedResults[person.name].common_subreddits.push(sub.name);
          } else {
            mappedResults[person.name] = {
              name: person.name,
              photo: person.photo,
              redditId: person.redditId,
              common_subreddits: [sub.name],
            };
          }
        }
        // Next, we build an array to send to the client
        const resultsArr = [];
        for (let key in mappedResults) {
          resultsArr.push(mappedResults[key]);
        }
        res.send(resultsArr);
      }
    });
  },
};

