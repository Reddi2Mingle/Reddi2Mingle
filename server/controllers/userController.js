const request = require('request');
const bluebird = require('bluebird');
const potentialController = require('./potentialController');
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

const matches = [
  {
    redditId: 'rshiei4n4',
    name: 'Casper Holmgreen',
    photo: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAhtAAAAJDNkM2M5YjdmLWYxZTUtNDg1MS04N2EwLTYyYjlmYTYxYzY1ZQ.jpg',
    subreddits: ['Office Depot', 'Dog Mania', 'Math all over me'],
    messageUrl: 'https://www.linkedin.com/msgToConns?displayCreate=&connId=127002602&goback=%2Enpv_AAkAAAeR5*5oBj6QjZ0FlpDYyszbSd1d*4GTkKsik_*1_*1_NAME*4SEARCH_D3Ov_*1_en*4US_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_tyah_*1_*1&trk=prof-0-sb-message-button',
  },
  {
    redditId: 'rsie34',
    name: 'Jeremy Toce',
    photo: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/2/005/07d/3ed/24801ee.jpg',
    subreddits: ['Lydia', 'LeatherDaddyLand', 'Growth Spurts'],
    messageUrl: 'https://www.linkedin.com/msgToConns?displayCreate=&connId=70699564&goback=%2Enpv_AAkAAAQ2yiwBGi9YkWLvYwSkfG*5uihI7x1J8jyk_*1_*1_NAME*4SEARCH_OhvK_*1_en*4US_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_tyah_*1_*1&trk=prof-0-sb-message-button',
  },
  {
    redditId: '12en2e32e',
    name: 'Sunny Virk',
    photo: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAMAAAAAJGVlNzYyYzMxLTllYmUtNDFlNy04ZTVmLWEzZmEyNzZjN2Q1MA.jpg',
    subreddits: ['curry kitchen', 'webpack nerds', 'pedicures'],
    messageUrl: 'https://www.linkedin.com/msgToConns?displayCreate=&connId=401581374&goback=%2Enpv_AAkAABfvpT4BAJPbMq0DeYUI7iwpuHAAZqlWYwY_*1_*1_NAME*4SEARCH_aJ8d_*1_en*4US_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_*1_tyah_*1_*1&trk=prof-0-sb-message-button',
  },
];


// Request list of user's subscribed subreddits
queryUserSubreddits = (redditId) => {
  return new Promise(function(resolve, reject) {
    db.cypher({
      query: 'MATCH (user:Person)-[r:FOLLOWS]->(subreddit) WHERE user.redditId={redditId} RETURN subreddit;',
      params: {
        redditId: redditId,
      },
    }, function (err, subreddits) {
      if (err) {
        console.log('error');
        reject(err);
      } else {
        var subredditList = subreddits.map(function (item) {
          return item.subreddit.properties.name;
        });
        resolve(subredditList);
      }
    });
  });
};

// Get the user's temporary access token
queryAccessToken = (redditId) => {
  return new Promise(function(resolve, reject) {
    db.cypher({
      query: 'MATCH (n:Person) WHERE n.redditId={redditId} return n.accessToken;',
      params: {
        redditId: redditId,
      },
    }, function (err, results) {
      if (err) {
        console.log('issue with retrieving', err);
        reject(err);
      } else {
        console.log('here is the accessToken', results[0]);
        resolve(results[0]);
      }
    })
  })
},

// Get list of subscribed subreddits from reddit and add to the database
createUserSubreddits = (redditId) => {
  // var redditId = req.query.redditId;
  // Request list of subscribed subreddits from Reddit
  queryAccessToken(redditId).then(function(accessToken) {
    request({
        url: 'https://@oauth.reddit.com/subreddits/mine',
        method: 'GET',
        headers: { 
            "authorization": "bearer " + accessToken,
            'User-Agent': 'javascript:reddi2mingle:v1.0.0 (by /u/neil_white)'
        }
      }, function(err, response) {
        // Create array of the subreddits
        var rawData = JSON.parse(response.body).data.children;
        var subredditList = rawData.map(function(item) {
          return item.data.display_name;
        })
        // Build cypher query to save new subreddits to database
        var mergeArray = [];
        var returnArray = [' RETURN '];

        subredditList.forEach(function(item, index) {
          mergeArray.push(" MERGE ("+String.fromCharCode(97 + index)+":Subreddit { name: '"+item+"' })")
          returnArray.push(String.fromCharCode(97 + index).toString() + ", ");
        })

        var saveSubreddits = mergeArray.join("") + returnArray.join("");
        saveSubreddits = saveSubreddits.slice(0, saveSubreddits.length - 2) + ";";

        // Build cypher query to save follows relationship between new user and their subscribed subreddits

        var matchArray = ['MATCH (user:Person {redditId:"'+redditId+'"}) '];
        var followsArray = []

        subredditList.forEach(function(item, index) {
          matchArray.push(" MATCH ("+String.fromCharCode(97 + index)+":Subreddit { name: '"+item+"' })")
          followsArray.push(" MERGE (user)-[:FOLLOWS]->("+String.fromCharCode(97 + index).toString() + ")");
        })

        var saveFollows = matchArray.join("") + followsArray.join("");
        saveFollows = saveFollows + ";";

        // Save the subreddits database
        db.cypher({
            query: saveSubreddits
        }, function (err, results) {
            if (err) {
              console.log("issue with adding " + profile.name + ": ",err)
            } else {
              console.log('user is saved to database', results);
              // Save the follow relationships for (user)->(subreddits) to the database
              db.cypher({
                  query: saveFollows
              }, function (err, results) {
                  if (err) {
                    console.log("issue with adding " + profile.name + ": ",err)
                  } else {
                    console.log('user is saved to database', results);
                      potentialController.createPotentials(redditId);
                  }
              });
            }
        });
      })
  })
},

module.exports = {
  sendDummyData: (req, res) => {
    res.send(dummyData);
  },

  createNewUser: (profile, accessToken, refreshToken) => {
    db.cypher({
  	    query: "MERGE (user:Person { redditId: {redditId} }) ON CREATE SET user.name = {username} ON CREATE SET user.redditId = {redditId} ON CREATE SET user.refreshToken = {refreshToken} ON CREATE SET user.accessToken = {accessToken} ON MATCH SET user.accessToken = {accessToken} RETURN user;",
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

          // Temporary fix to create relationships to the new user
          // request({
          //   url: 'http://localhost:3000/subreddits?redditId=' + profile.id,
          //   method: 'GET',
          // }, function(err, response) {
          //   if (err) throw err;
          // });

          createUserSubreddits(profile.id);

  		  }
  	});
  },

  queryUserInfo: (req, res) => {
    const redditId = req.query.redditId
    var subreddits = [];
    // First query database for subreddit connections
    queryUserSubreddits(redditId).then(function(subreddits) {
      // Query database for the user's name, photo, etc.
      db.cypher({
        query: 'MATCH (user:Person) WHERE user.redditId={redditId} RETURN user;',
        params: {
          redditId: redditId,
        }
      }, function (err, results) {
        if (err) {
          console.log('issue with retrieving', err);
        } else {
          var aggregateInfo = results[0].user.properties;
          aggregateInfo['subreddits'] = subreddits;
          aggregateInfo['matches'] = matches;
          res.send(aggregateInfo);
        }
      });
    });
  },

  // Query database for Reddit refreshToken
  queryRefreshToken: (redditId) => {
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
};
