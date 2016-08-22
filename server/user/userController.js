const neo4j = require('neo4j');
const potentialController = require('../potentialMatch/potentialController');
// const db = require('../db/neo4jconfig').db;
const db = new neo4j.GraphDatabase('http://neo4j:cake@localhost:7474');
const request = require('request');

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

queryUserInfo = (redditId) => (
  // Request userInfo from database
  request({
    url: `http://localhost:3001/api/user-sql/userInfo?${redditId}`,
    method: 'GET',
  }, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      res.send('username and password match');
    }
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
      url: 'http://localhost:3001/api/user-sql/updatePassword',
      method: 'POST',
      form: {
        redditId: req.body.redditId,
        password: req.body.password,
      },
    }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        res.send('password updated successfully')
      }
    });
  },

  queryUserInfo: (req, res) => {
    const redditId = req.body.redditId;
    queryUserInfo(redditId);
  },

  // THIS SECTION NEEDS TO BE COMPLETED
  loginCredentials: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    request({
      url: 'http://localhost:3001/api/user-sql/loginCredentials',
      method: 'POST',
      form: {
        username: username,
        password: password,
      },
    }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        // This is the point where I can add in Passport authentication before proceeding
        // Respond with the redditId, username and photo
        if (response.statusCode === 401) {
          res.status(401).send('invalid password');
        } else {
          // Send off request to update the user's token
          request({
            url: 'http://localhost:3001/api/user-sql/updateAccessToken',
            method: 'POST',
            form: {
              username: username,
              password: password,
            },
          });
          // Send the redditId, username and photo to the client
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
      url: 'http://localhost:3001/api/user-sql/addPreference',
      method: 'POST',
      form: {
        redditId: redditId,
        gender: gender,
        preference: preference,
      },
    }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        res.send('preferences updated successfully')
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

};
