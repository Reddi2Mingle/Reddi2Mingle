const request = require('request');
const REDDIT_CONSUMER_KEY = process.env.REDDIT_KEY;
const REDDIT_CONSUMER_SECRET = process.env.REDDIT_SECRET;

module.exports = {
  getSignupPage: () => {
    request.get("https://ssl.reddit.com/api/v1/authorize?state='uniquestring'&duration=permanent&response_type=code&scope=identity&client_id=" + REDDIT_CONSUMER_KEY + "&redirect_uri=https://github.com/Reddi2Mingle/Reddi2MingleMVP")
    .on('response', (response) => {
      console.log(response);
      res.send(response);
    });
  },
};
