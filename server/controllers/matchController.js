const neo4j = require('neo4j');
const db = new neo4j.GraphDatabase('http://neo4j:cake@localhost:7474');

module.exports = {

	createMatch: (username) => {
  	db.cypher({
  	    query: 'MATCH (user:Person)-[r:INTERESTED_IN]->(subreddit)<-[:INTERESTED_IN]-(potential:Person) WHERE user.name = {username} MERGE (user)<-[:POTENTIAL]->(potential) RETURN user, potential, r;',
  	    params: {
  	    	username: username,
  	    }
  	}, function (err, results) {
  		  if (err) {
  		    console.log("issue with ": err)
  		  } else {
  		    console.log('list of potentials', results);
  		  }
  	});
  },

}