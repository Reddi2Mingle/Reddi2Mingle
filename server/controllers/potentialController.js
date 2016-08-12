const neo4j = require('neo4j');
const db = new neo4j.GraphDatabase('http://neo4j:cake@localhost:7474');
const request = require('request');

module.exports = {

	createPotentials: (redditId) => {
  	db.cypher({
  	    query: 'MATCH (user:Person)-[r:INTERESTED_IN]->(subreddit)<-[:INTERESTED_IN]-(potential:Person) WHERE user.redditId = {redditId} MERGE (user)<-[:POTENTIAL]->(potential) RETURN user, potential, r;',
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

  queryPotentials: (redditId, socket) => {
  	db.cypher({
  	    query: 'MATCH (user:Person)<-[r:POTENTIAL]->(potential:Person) WHERE user.redditId={redditId} RETURN potential LIMIT 20;',
  	    params: {
  	    	redditId: redditId,
  	    }
  	}, function (err, potentials) {
  		  if (err) {
  		    console.log("issue with: ", err)
  		  } else {
  		    console.log('list of 10 existing potentials', potentials);
  		    socket.emit('send potentials', potentials);
  		  }
  	});
  }

}