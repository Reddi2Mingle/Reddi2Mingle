const neo4j = require('neo4j');

const db = new neo4j.GraphDatabase('http://neo4j:cake@localhost:7474');

module.exports = {

  createPotentials: (redditId) => {
    db.cypher({
      query: 'MATCH (user:Person)-[r:FOLLOWS]->(s: subreddit)<-[:FOLLOWS]-(potential:Person) WHERE user.redditId = {redditId} MERGE (user)<-[:POTENTIAL]->(potential) RETURN user, potential, r, s;',
      params: {
        redditId,
      },
    }, (err, results) => {
      if (err) {
        console.log('issue with: ', err);
      } else {
        console.log('list of potentials', results);
      }
    });
  },

  queryPotentials: (req, res) => {
    redditId = req.query.redditId;
    db.cypher({
      query: `MATCH (user:Person {redditId: "${redditId}" })-[f:FOLLOWS]->(s:Subreddit)<-[:FOLLOWS]-(potential:Person) RETURN potential,user,s LIMIT 2;`,
      params: {
        redditId,
      },
    }, (err, potentials) => {
      if (err) {
        console.log('issue with: ', err);
        res.send([]);
      } else {
        if (err) {
          console.log('issue with: ', err);
        } else {
          var arrayOfPotentials = [];
          var finalPotentials = [];

          for (var i = 0; i < potentials.length; i++) {
            var personObj = {};
            const potential = potentials[i].potential.properties.name;
            const repeatPotential = arrayOfPotentials.indexOf(potential);
            const sub = potentials[i].s.properties.name;
            personObj = potentials[i].potential.properties;
            if (repeatPotential === -1) {
              personObj['common_subreddits'] = [sub];
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
      }
    });
  },

};
