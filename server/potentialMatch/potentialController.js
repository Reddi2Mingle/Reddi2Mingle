'use strict';

const neo4j = require('neo4j');
const db = require('../db/neo4jconfig').db;

module.exports = {

  createPotentials: (redditId) => {
    db.cypher({
      query: 'MATCH (user:Person)-[r:FOLLOWS]->(s: Subreddit)<-[:FOLLOWS]-(potential:Person) \
              WHERE user.redditId = {redditId} \
              MERGE (user)<-[:POTENTIAL]->(potential) \
              RETURN user, potential, s;',
      params: {
        redditId,
      },
    }, (err, results) => {
      if (err) {
        console.log('issue with: ', err);
      } else {
        console.log('list of potentials');
      }
    });
  },

  queryPotentials: (req, res) => {
    const redditId = req.query.redditId;
    console.log('redditId:', redditId);
    db.cypher({
      query: `MATCH (user:Person)
      -[f:FOLLOWS]->(s:Subreddit)
      <-[:FOLLOWS]-(potential:Person)
      WHERE user.redditId="${redditId}"
      AND NOT (user)-[:INTEREST]->(potential)
      AND NOT (user)-[:NEVER]-(potential)
      AND NOT (user)-[:MATCH]-(potential)
      RETURN potential,user,s
      ORDER BY s.subscribers
      LIMIT 10;`,
      // query: `MATCH (user:Person)<-[p:POTENTIAL]->(potential:Person)
      //           WHERE user.redditId="${redditId}"
      //         MATCH (user)-[uf:FOLLOWS]->(s:Subreddit)<-[pf:FOLLOWS]-(potential)
      //         RETURN potential,user,s
      //         LIMIT 10;`,
    }, (err, potentials) => {
      if (err) {
        console.log('issue with: ', err);
        res.send([]);
      } else {
        console.log('potentials:', potentials);
        const arrayOfPotentials = [];
        const finalPotentials = [];

        for (let i = 0; i < potentials.length; i++) {
          let personObj = {};
          const potential = potentials[i].potential.properties.name;
          const repeatPotential = arrayOfPotentials.indexOf(potential);
          const sub = potentials[i].s.properties.name;
          personObj = potentials[i].potential.properties;
          if (repeatPotential === -1) {
            personObj.common_subreddits = [sub];
            arrayOfPotentials.push(potential);
            finalPotentials.push(personObj);
          } else {
            // for multiple subreddit commonalities:
            for (const finalPotential of finalPotentials) {
              // if potential is in potentials array,
              // push it to existing potential's subreddit array
              if (finalPotential.name === potential) {
                finalPotential.common_subreddits.push(sub);
              }
            }
          }
        }
        res.send(finalPotentials);
      }
    });
  },

};
