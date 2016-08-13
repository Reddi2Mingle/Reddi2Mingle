const request = require('request');
const neo4j = require('neo4j');

const REDDIT_CONSUMER_KEY = process.env.REDDIT_KEY;
const REDDIT_CONSUMER_SECRET = process.env.REDDIT_SECRET;
const db = new neo4j.GraphDatabase('http://neo4j:cake@localhost:7474');

const dummyData = {
  redditID: 'e4e3k6i4em3k',
  name: 'Jen',
  photo: 'https://scontent.xx.fbcdn.net/v/t1.0-9/13438871_10208696268978453_1392015277595705466_n.jpg?oh=ca631ff0a564a0b32a4359777894a0d1&oe=585F0466',
  matches: [
    {
      redditID: 'rshiei4n4',
      name: 'Casper Holmgreen',
      photo: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAhtAAAAJDNkM2M5YjdmLWYxZTUtNDg1MS04N2EwLTYyYjlmYTYxYzY1ZQ.jpg',
      subreddits: ['Office Depot', 'Dog Mania', 'Math all over me'],
      messageUrl: 'https://www.linkedin.com/msgToConns?displayCreate=&connId=127002602&goback=%2Enpv_AAkAAAeR5*5oBj6QjZ0FlpDYyszbSd1d*4GTkKsik_*1_*1_NAME*4SEARCH_D3Ov_*1_en*4US_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_tyah_*1_*1&trk=prof-0-sb-message-button',
    },
    {
      redditID: 'rsie34',
      name: 'Jeremy Toce',
      photo: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/2/005/07d/3ed/24801ee.jpg',
      subreddits: ['Lydia', 'LeatherDaddyLand', 'Growth Spurts'],
      messageUrl: 'https://www.linkedin.com/msgToConns?displayCreate=&connId=70699564&goback=%2Enpv_AAkAAAQ2yiwBGi9YkWLvYwSkfG*5uihI7x1J8jyk_*1_*1_NAME*4SEARCH_OhvK_*1_en*4US_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_tyah_*1_*1&trk=prof-0-sb-message-button',
    },
    {
      redditID: '12en2e32e',
      name: 'Sunny Virk',
      photo: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAMAAAAAJGVlNzYyYzMxLTllYmUtNDFlNy04ZTVmLWEzZmEyNzZjN2Q1MA.jpg',
      subreddits: ['curry kitchen', 'webpack nerds', 'pedicures'],
      messageUrl: 'https://www.linkedin.com/msgToConns?displayCreate=&connId=401581374&goback=%2Enpv_AAkAABfvpT4BAJPbMq0DeYUI7iwpuHAAZqlWYwY_*1_*1_NAME*4SEARCH_aJ8d_*1_en*4US_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_tyah_*1_*1&trk=prof-0-sb-message-button',
    },
  ],
};


// query database for Reddit refreshToken
queryRefreshToken = (redditId) => {
  db.cypher({
    query: 'MATCH (n:Person) WHERE n.redditId={redditId} return n.refreshToken;',
    params: {
      redditId: redditId,
    }
  }, function (err, results) {
    if (err) {
      console.log('issue with retrieving', err);
    } else {
      console.log('here is the accessToken', results);
    }
  })
}

// Request list of user's subscribed subreddits
queryUserSubreddits = (redditId) => {
  // return new Promise(function(resolve, reject) {
    db.cypher({
      query: 'MATCH (user:Person)-[r:FOLLOWS]->(subreddit) WHERE user.redditId={redditId} RETURN subreddit;',
      params: {
        redditId: redditId,
      }
    }, function (err, subreddits) {
      if (err) {
        reject(err)
      } else {
        console.log('list of subreddits', subreddits);
        // resolve(subreddits)
      }
    })
  // }
},

module.exports = {

  sendDummyData: (req, res) => {
    res.send(dummyData)
  },

  createNewUser: (profile, accessToken, refreshToken) => {
    db.cypher({
  	    query: 'CREATE (person:Person { name: {username}, redditId: {redditId}, accessToken: {accessToken}, refreshToken: {refreshToken}});',
  	    params: {
  	    	username: profile.name,
  	    	redditId: profile.id,
  	    	accessToken: accessToken,
  	    	refreshToken: refreshToken,
          photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
  	    }
  	}, function (err, results) {
  		  if (err) {
  		    console.log("issue with adding " + profile.name + ": ",err)
  		  } else {
  		    console.log('user is saved to database', results);
  		  }
  	});
  },

  queryUserInfo: (req, res) => {
    const redditId = req.body.redditId;
    var subreddits = [];
    queryUserSubreddits(redditId);


  },

  // Get the user's temporary access token
  queryAccessToken: (redditId) => {
  	db.cypher({
  		query: 'MATCH (n:Person) WHERE n.redditId={redditId} return n.accessToken;',
  		params: {
  			redditId: redditId,
  		}
  	}, function (err, results) {
  		if (err) {
  			console.log('issue with retrieving', err);
  		} else {
  			console.log('here is the accessToken', results);
  		}
  	})
  },

  // Get list of subscribed subreddits from reddit and add to the database
  addUserSubreddits: (accessToken) => {
    request({
        url: 'https://@oauth.reddit.com/subreddits/mine',
        method: 'GET',
        headers: { 
            'Authorization': 'bearer JEgLDW8Ke24fQUN2rmu7hN4UzFk'
        }
      }, function(err, response) {
        console.log(response.body);
      })
  },
};