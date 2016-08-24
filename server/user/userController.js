const db = require('../db/neo4jconfig').db;
const request = require('request');
require('../helpers/api_keys');

const neo4j = require('neo4j');
const potentialController = require('../potentialMatch/potentialController');
// const db = require('../db/neo4jconfig').db;
const db = new neo4j.GraphDatabase('http://neo4j:neo4j@neo4j:7474');
const request = require('request');
require('../helpers/api_keys');

// Request list of user's subscribed subreddits
const queryUserSubreddits = (redditId) => (
  new Promise((resolve, reject) => {
    db.cypher({
      query: `MATCH (user:Person)-[r:FOLLOWS]->(subreddit) 
                WHERE user.redditId="${redditId}" 
              RETURN subreddit;`,
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
                WHERE n.redditId="${redditId}" 
              RETURN n.accessToken;`,
    }, (err, results) => {
      if (err) {
        console.log(`server/userController.js: issue with retrieving ${err}`);
        reject(err);
      } else {
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
      const subredditList = rawData.map(item => ({
        name: item.data.display_name,
        subscribers: item.data.subscribers,
      }));

      // Build cypher query to save new subreddits to database
      var mergeArray = [];
      var returnArray = [' RETURN '];

      subredditList.forEach((item, index) => {
        mergeArray.push(` MERGE (${item.name}:Subreddit { name: '${item.name}' }) 
                            ON CREATE SET ${item.name}.subscribers = ${item.subscribers} 
                            ON MATCH SET ${item.name}.subscribers = ${item.subscribers} `);
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
          console.log(`server/userController.js: issue with adding ${results}: ${err}`);
        } else {
          console.log(`server/userController.js: subreddits saved to database, results: ${results}`);
          // Save the follow relationships for (user)->(subreddits) to the database
          db.cypher({
              query: saveFollows,
          }, (err, results) => {
            if (err) {
              console.log(`server/userController.js: issue with adding ${results}: ${err}`);
            } else {
              console.log(`server/userController.js: subreddit relationships saved to database, results:  ${results}`);
              potentialController.createPotentials(redditId);
            }
          });
        }
      });
    });
  });
};

module.exports = {

  updatePassword: (req, res) => {
    request({
      url: `http://${process.env.HOST}:${process.env.PORT_USER}/api/user-sql/updatePassword`,
      method: 'POST',
      form: {
        redditId: req.body.redditId,
        password: req.body.password,
      },
    }, (err, response) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send('password updated successfully');
      }
    });
  },

  queryUserInfo: (req, res) => {
    const redditId = req.query.redditId;
    request({
      url: `http://${process.env.HOST}:${process.env.PORT_USER}/api/user-sql/userInfo?redditId=${redditId}`,
      method: 'GET',
    }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        res.send(response);
      }
    });
  },

  // Login process is kicked off with this function
  loginCredentials: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Send request to the User Service to verify the username and password match
    request({
      url: `http://${process.env.HOST}:${process.env.PORT_USER}/api/user-sql/loginCredentials`,
      method: 'POST',
      form: {
        username,
        password,
      },
    }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        // This is the point where we can add in Passport authentication before proceeding
        if (response.statusCode === 401) {
          res.status(401).send('invalid password');
        } else {
          // Send the redditId as the success message to client
          res.send(response.body);
        }
      }
    });
  },

  addPreference: (req, res) => {
    const gender = req.body.gender;
    const preference = req.body.preference;
    const redditId = req.body.redditId;
    request({
      url: `http://${process.env.HOST}:${process.env.PORT_USER}/api/user-sql/addPreference`,
      method: 'POST',
      form: {
        redditId,
        gender,
        preference,
      },
    }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log('preferences updated successfully', response.body);
        res.send('preferences and potentials updated successfully');
      }
    });
  },

  addPhoto: (req, res) => {
    const redditId = req.body.redditId;
    const photo = req.body.photo;
    request({
      url: `http://localhost:${process.env.PORT_USER}/api/user-sql/addPhoto`,
      method: 'POST',
      form: {
        redditId,
        photo,
      },
    }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log('photo updated successfully', response.body);
        res.send('photo updated successfully');
      }
    });
  },

};
