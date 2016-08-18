const bluebird = require('bluebird');
const neo4j = require('neo4j');
const potentialController = require('../potentialMatch/potentialController');
const db = require('../../db/config').db;
const request = require('request');

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
const queryUserSubreddits = (redditId) => (
  new Promise((resolve, reject) => {
    db.cypher({
      query: 'MATCH (user:Person)-[r:FOLLOWS]->(subreddit) \
              WHERE user.redditId={redditId} \
              RETURN subreddit;',
      params: {
        redditId,
      },
    }, (err, subreddits) => {
      if (err) {
        console.log('server/userController.js 74: error');
        reject(err);
      } else {
        const subredditList = subreddits.map(item => (item.subreddit.properties.name));
        resolve(subredditList);
      }
    });
  })
);

// Get the user's temporary access token
const queryAccessToken = (redditId) => (
  new Promise((resolve, reject) => {
    db.cypher({
      query: 'MATCH (n:Person) WHERE n.redditId={redditId} return n.accessToken;',
      params: {
        redditId,
      },
    }, (err, results) => {
      if (err) {
        console.log(`server/userController.js 94: issue with retrieving ${err}`);
        reject(err);
      } else {
        console.log(`server/userController.js 97: here is the accessToken ${results[0]['n.accessToken']}`);
        resolve(results[0]['n.accessToken']);
      }
    });
  })
);

// Get list of subscribed subreddits from reddit and add to the database
const createUserSubreddits = (redditId) => {
  // var redditId = req.query.redditId;
  // Request list of subscribed subreddits from Reddit
  queryAccessToken(redditId).then((accessToken) => {
    request({
      url: 'https://@oauth.reddit.com/subreddits/mine',
      method: 'GET',
      headers: {
        'authorization': `bearer ${accessToken}`,
        'User-Agent': 'javascript:reddi2mingle:v1.0.0 (by /u/neil_white)',
      },
    }, (err, response) => {


      // Create array of the subreddits
      const rawData = JSON.parse(response.body).data.children;
      const subredditList = rawData.map(item => ({name: item.data.display_name, subscribers: item.data.subscribers}));

      // Build cypher query to save new subreddits to database
      var mergeArray = [];
      var returnArray = [' RETURN '];

      subredditList.forEach((item, index) => {
        mergeArray.push(` MERGE (${item.name}:Subreddit { name: '${item.name}' }) 
          ON CREATE SET ${item.name}.subscribers = ${item.subscribers} 
          ON MATCH SET ${item.name}.subscribers = ${item.subscribers} `)
         // Example of result from above line:
         // "MERGE (sanfrancisco:Subreddit { name: 'sanfrancisco', subscribers: 108}) MERGE ... "
        returnArray.push(`${item.name}, `);
        // Example of result from above line:
        // "RETURN sanfrancisco, ..."
      });

      // Join the two arrays together into one cypher query to save subreddits to Neo4j
      var saveSubreddits = mergeArray.join('') + returnArray.join('');
      // Replace last comma character with a semicolon
      saveSubreddits = saveSubreddits.slice(0, saveSubreddits.length - 2) + ';';

      // Build cypher query to save follows relationship
      // between new user and their subscribed subreddits

      var matchArray = [`MATCH (user:Person {redditId:"${redditId}"}) `];
      var followsArray = [];

      subredditList.forEach((item, index) => {
        matchArray.push(` MATCH (${item.name}:Subreddit { name: '${item.name}' })`);
        followsArray.push(` MERGE (user)-[:FOLLOWS]->(${item.name})`);
      });

      var saveFollows = matchArray.join('') + followsArray.join('');
      saveFollows += ';';

      // Save the subreddits database
      db.cypher({
          query: saveSubreddits,
      }, (err, results) => {
        if (err) {
          console.log(`server/userController.js 150: issue with adding ${results}: ${err}`);
        } else {
          console.log(`server/userController.js 152: subreddits saved to database, results: ${results}`);
          // Save the follow relationships for (user)->(subreddits) to the database
          db.cypher({
              query: saveFollows,
          }, (err, results) => {
            if (err) {
              console.log(`server/userController.js 158: issue with adding ${results}: ${err}`);
            } else {
              console.log(`server/userController.js 160: subreddit relationships saved to database, results:  ${results}`);
              potentialController.createPotentials(redditId);
            }
          });
        }
      });
    });
  });
};

module.exports = {

  createNewUser: (profile, accessToken, refreshToken) => {
    db.cypher({
      query: 'MERGE (user:Person { redditId: {redditId} }) \
              ON CREATE SET user.name = {username} \
              ON CREATE SET user.redditId = {redditId} \
              ON CREATE SET user.refreshToken = {refreshToken} \
              ON CREATE SET user.accessToken = {accessToken} \
              ON CREATE SET user.photo = {photo} \
              ON MATCH SET user.accessToken = {accessToken} \
              RETURN user;',
      params: {
        username: profile.name,
        redditId: profile.id,
        accessToken,
        refreshToken,
        photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
      },
    }, (err, results) => {
      if (err) {
        console.log(`server/userController.js 193: issue with adding ${profile.name}: ${err}`);
      } else {
        console.log(`server/userController.js 195: user is actually saved to database, results: ${results}`);
        createUserSubreddits(profile.id);
      }
    });
  },

  updatePassword: (req, res) => {
    console.log('testing answer!!!!!!!!!!!!!');
    res.send('testing answer');
  },

  addPreference: (req, res) => {
    const gender = req.body.gender;
    const preference = req.body.preference;
    const redditId = req.body.redditId;

    db.cypher({
      query: `MERGE (user:Person {redditId: "${redditId}"})
      ON MATCH SET user.gender = "${gender}"
      ON MATCH SET user.preference = "${preference}"
      RETURN user;`,
    }, (err, results) => {
      if (err) {
        console.log(`server/userController.js: issue with updating preference and gender, err ${err}`)
      } else {
        console.log(`server/userController.js: gender and prefernce added sucessfully`);
        res.send(200);
      }
    });
  },

  queryUserInfo: (req, res) => {
    const redditId = req.query.redditId;
    // var subreddits = [];
    console.log(`server/userController.js 211: my reddit id: ${redditId}`);
    // First query database for subreddit connections
    queryUserSubreddits(redditId).then((subreddits) => {
      // Query database for the user's name, photo, etc.
      db.cypher({
        query: 'MATCH (user:Person) WHERE user.redditId={redditId} RETURN user;',
        params: {
          redditId,
        },
      }, (err, results) => {
        if (err) {
          console.log(`server/userController.js 222: issue with retrieving, err: ${err}`);
        } else {
          console.log(`server/userController.js 224: results: ${results}`);
          var aggregateInfo = results[0].user.properties;
          aggregateInfo.subreddits = subreddits;
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
        redditId,
      },
    }, (err, results) => {
      if (err) {
        console.log(`server/userController.js 243: issue with retrieving, err: ${err}`);
      } else {
        console.log(`server/userController.js 245: here is the accessToken: ${results}`);
      }
    });
  },
};
