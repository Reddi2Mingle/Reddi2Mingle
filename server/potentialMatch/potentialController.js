'use strict';

const db = require('../db/neo4jconfig').db;

module.exports = {

  createPotentials: (req, res) => {
    const redditId = req.body.redditId;
    db.cypher({
      query: `MATCH (user:Person)-[r:FOLLOWS]->(s: Subreddit)<-[:FOLLOWS]-(potential:Person) 
              WHERE user.redditId = "${redditId}" 
              AND ( user.gender=potential.preference OR potential.preference="both" ) 
              AND ( CASE user.preference 
              WHEN "man" THEN potential.gender="man" 
              WHEN "woman" THEN potential.gender="woman" 
              WHEN "both" THEN potential.gender="man" OR potential.gender="woman"
              END) 
              MERGE (user)<-[:POTENTIAL]->(potential);`,
    }, (err, results) => {
      if (err) {
        console.log('issue with: ', err);
      } else {
        console.log('list of potentials');
        res.send('potentials created');
      }
    });
  },

  queryPotentials: (req, res) => {
    const redditId = req.query.redditId;
    const limit = 10;
    db.cypher({
      // query: `MATCH (user:Person)
      //         -[f:FOLLOWS]->(s:Subreddit)
      //         <-[:FOLLOWS]-(potential:Person)
      //           WHERE user.redditId="${redditId}"
      //           AND NOT (user)-[:INTEREST]->(potential)
      //           AND NOT (user)-[:NEVER]-(potential)
      //           AND NOT (user)-[:MATCH]-(potential)
      //         RETURN potential,user,s
      //           ORDER BY s.subscribers
      //           LIMIT 10;`,
      query: `MATCH (:Person {redditId: "${redditId}"})<-[:INTEREST]-(potential:Person) 
                WITH potential
                LIMIT ${limit}
              MATCH (potential)-[:FOLLOWS]->(sub:Subreddit)<-[:FOLLOWS]-(:Person {redditId: "${redditId}"})
                RETURN potential, sub;`,
    }, (err1, interests) => {
      if (err1) {
        console.log('issue with: ', err1);
        res.send([]);
      } else {
        // first we have to sift through the results returned, because it returns
        // an array containing objects for each subreddit and person
        const people = {};
        let interestedPerson;
        let interestedSub;
        for (let interest of interests) {
          interestedPerson = interest.potential.properties;
          interestedSub = interest.sub.properties;
          if (people[interestedPerson.name]) {
            people[interestedPerson.name].common_subreddits.push(interestedSub.name);
          } else {
            people[interestedPerson.name] = {
              name: interestedPerson.name,
              photo: interestedPerson.photo,
              redditId: interestedPerson.redditId,
              common_subreddits: [interestedSub.name],
              interested: true,
            };
          }
        }

        // Next, we convert the object to an array
        const interestsArr = [];
        for (let key in people) {
          interestsArr.push(people[key]);
        }

        const remainder = limit - interestsArr.length;

        // if there are less than 10 interested potentials, query the database for
        // potentials that have not yet swiped on the user
        if (remainder > 0) {
          db.cypher({
            query: `MATCH (:Person {redditId: "${redditId}"})<-[:POTENTIAL]->(potential:Person) 
                      WITH potential
                      LIMIT ${remainder}
                    MATCH (potential)-[:FOLLOWS]->(sub:Subreddit)<-[:FOLLOWS]-(:Person {redditId: "${redditId}"})
                    RETURN potential, sub;`,
          }, (err2, potentials) => {
            if (err2) {
              console.log('issue with: ', err2);
              res.send([]);
            } else {
              // again, sift through the results of the query and build onto
              // the existing people object
              let potentialPerson;
              let potentialSub;
              for (let potential of potentials) {
                potentialPerson = potential.potential.properties;
                potentialSub = potential.sub.properties;
                if (people[potentialPerson.name]) {
                  people[potentialPerson.name].common_subreddits.push(potentialSub.name);
                } else {
                  people[potentialPerson.name] = {
                    name: potentialPerson.name,
                    photo: potentialPerson.photo,
                    redditId: potentialPerson.redditId,
                    common_subreddits: [potentialSub.name],
                    interested: false,
                  };
                }
              }

              // Populate a new array and send back to the client
              const potentialsArr = [];
              for (let key in people) {
                potentialsArr.push(people[key]);
              }

              res.send(potentialsArr);
            }
          });
          // if the remainder is <= 0, just send the 10 interested potentials
        } else {
          res.send(interestsArr);
        }
      }
    });
  },

};
