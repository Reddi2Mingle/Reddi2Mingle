const request = require('request');
const REDDIT_CONSUMER_KEY = process.env.REDDIT_KEY;
const REDDIT_CONSUMER_SECRET = process.env.REDDIT_SECRET;
const neo4j = require('neo4j');
const db = new neo4j.GraphDatabase('http://neo4j:cake@localhost:7474');

module.exports = {
  createNewUser: (profile, accessToken, refreshToken) => {
    db.cypher({
  	    query: 'CREATE (person:Person { name: {username}, redditId: {redditId}, accessToken: {accessToken}, refreshToken: {refreshToken}});',
  	    params: {
  	    	username: profile.name,
  	    	redditId: profile.id,
  	    	accessToken: accessToken,
  	    	refreshToken: refreshToken,
  	    }
  	}, function (err, results) {
  		  if (err) {
  		    console.log("issue with adding " + profile.name + ": ",err)
  		  } else {
  		    console.log('user is saved to database', results);
  		  }
  	});
  },

  // Get the user's temporary access token
  grabAccessToken: (username) => {
  	db.cyper({
  		query: 'MATCH (n:Person) WHERE n.name={username} return n.accessToken;',
  		params: {
  			username: username,
  		}
  	}, function (err, results) {
  		if (err) {
  			console.log('issue with retrieving', err);
  		} else {
  			console.log('here is the accessToken', results);
  		}
  	})
  },

  // query database for Reddit refreshToken
  grabRefreshToken: (username) => {
  	db.cyper({
  		query: 'MATCH (n:Person) WHERE n.name={username} return n.refreshToken;',
  		params: {
  			username: username,
  		}
  	}, function (err, results) {
  		if (err) {
  			console.log('issue with retrieving', err);
  		} else {
  			console.log('here is the accessToken', results);
  		}
  	})
  },

  // Request list of user's subscribed subreddits
  grabSubredditList: (accessToken) => {
    request({
        url: 'https://@oauth.reddit.com/subreddits/mine',
        method: 'GET',
        headers: { 
            'Authorization': 'bearer ' + accessToken
        }
      }, function(err, response) {
        console.log('it worked!', response.body);
      })
  },
};  
