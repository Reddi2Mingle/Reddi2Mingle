const bluebird = require('bluebird');
const neo4j = require('neo4j');
const potentialController = require('../potentialMatch/potentialController');
const db = require('../../db/config').db;
const request = require('request');


// Request list of user's subscribed subreddits
const queryUserSubreddits = (redditId) => (
  new Promise((resolve, reject) => {
    db.cypher({
      query: `MATCH (user:Person)-[r:FOLLOWS]->(subreddit) 
              WHERE user.redditId={redditId} 
              RETURN subreddit;`,
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
      query: `MATCH (n:Person) 
              WHERE n.redditId={redditId} 
              RETURN n.accessToken;`,
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
        console.log(`server/userController.js: issue with updating preference and gender, err ${err}`);
      } else {
        console.log(`server/userController.js: gender and prefernce added sucessfully`);
        res.send(200);
      }
    });
  },

  addPhoto: (req, res) => {
    db.cypher({
      query: `MATCH (user:Person) 
              WHERE user.redditId = "${req.body.redditId}"
              SET user.photo = "${req.body.photo}"
              RETURN user`,
    }, (err, results) => {
      if (err) {
        console.log(`server/userController.js: issue with updating photo, err ${err}`);
      } else {
        res.send(results);
      }
    });
  },

  queryUserInfo: (req, res) => {
    const redditId = req.query.redditId;
    // First query database for subreddit connections
    queryUserSubreddits(redditId).then((subreddits) => {
      // Query database for the user's name, photo, etc.
      db.cypher({
        query: `MATCH (user:Person) 
                WHERE user.redditId=${redditId} 
                RETURN user;`,
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
      query: `MATCH (n:Person) 
              WHERE n.redditId=${redditId} 
              RETURN n.refreshToken;`,
    }, (err, results) => {
      if (err) {
        console.log(`server/userController.js 243: issue with retrieving, err: ${err}`);
      } else {
        console.log(`server/userController.js 245: here is the accessToken: ${results}`);
      }
    });
  },
};
