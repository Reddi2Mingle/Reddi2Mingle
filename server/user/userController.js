const db = require('../db/neo4jconfig').db;
const request = require('request');
require('../helpers/api_keys');

module.exports = {

  updatePassword: (req, res) => {
    request({
      url: `http://localhost:${process.env.PORT_USER}/api/user-sql/updatePassword`,
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
      url: `http://localhost:${process.env.PORT_USER}/api/user-sql/userInfo?redditId=${redditId}`,
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
      url: `http://localhost:${process.env.PORT_USER}/api/user-sql/loginCredentials`,
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
        // Respond with the redditId, username and photo
        if (response.statusCode === 401) {
          res.status(401).send('invalid password');
        } else {
          // Send off request to update the user's token
          request({
            url: `http://localhost:${process.env.PORT_USER}/api/user-sql/updateAccessToken`,
            method: 'POST',
            form: {
              username,
              password,
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
      url: `http://localhost:${process.env.PORT_USER}/api/user-sql/addPreference`,
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
