const neo4j = require('neo4j');
const request = require('request');

const db = new neo4j.GraphDatabase('http://neo4j:cake@localhost:7474');

module.exports = {

	createPotentials: (redditId) => {
    db.cypher({
  	    query: 'MATCH (user:Person)-[r:FOLLOWS]->(subreddit)<-[:FOLLOWS]-(potential:Person) WHERE user.redditId = {redditId} MERGE (user)<-[:POTENTIAL]->(potential) RETURN user, potential, r;',
  	    params: {
  	    	redditId: redditId,
  	    }
  	}, function (err, results) {
  		  if (err) {
  		    console.log("issue with: ", err)
  		  } else {
  		    console.log('list of potentials', results);
  		  }
  	});
  },

  queryPotentials: (req, res) => {
  	redditId = req.query.redditId
    db.cypher({
  	    query: 'MATCH (user:Person)<-[r:POTENTIAL]->(potential:Person) WHERE user.redditId={redditId} RETURN potential LIMIT 20;',
  	    params: {
  	    	redditId: redditId,
  	    }
  	}, function (err, results) {
  		  if (err) {
  		    console.log("issue with: ", err)
  		  } else {
          var potentials = results.map(function(item) {
            return item.potential.properties;
          })
  		    res.send(potentials);
  		  }
  	});
  }

}