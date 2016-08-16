const neo4j = require('neo4j');

const db = new neo4j.GraphDatabase('http://neo4j:neo4j@localhost:7474');

module.exports = {
  // returns array of matches for user
  showMatches: (req, res) => {
	// params: redditId
    const r = req.query;
    const user = r.redditId;

    db.cypher({
      query: `MATCH (user:Person {redditId: "${user}"})-[r:MATCH]-(matched:Person) RETURN matched`,
    }, (err, matched) => {
      if (err) {
        console.log('Error in finding potential interest for user:', err);
        res.send([]);
      } else {
        matched = matched.map(v => (v.matched.properties));
        console.log('matched TRYING TO MATCH TRYING TO MATCH: ', matched);
        res.send(matched);
      }
    });
  },
};
