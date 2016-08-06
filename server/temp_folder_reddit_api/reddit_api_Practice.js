
REDDIT_CONSUMER_KEY:
'T3zDXS9GxKukbA'
REDDIT_CONSUMER_SECRET:
'TAKMSJzrlZPzTWxK5O3w7OglWA8'


var get = 
https://ssl.reddit.com/api/v1/authorize?state='uniquestring'&duration=permanent&response_type=code&scope=identity&client_id=T3zDXS9GxKukbA&redirect_uri=https://github.com/Reddi2Mingle/Reddi2MingleMVP


-LClI7rjt6HmF0D9eZ5zdazIdbg


var post = 
https://T3zDXS9GxKukbA:TAKMSJzrlZPzTWxK5O3w7OglWA8@ssl.reddit.com/api/v1/access_token?state='uniquestring'&scope=identity&client_id=T3zDXS9GxKukbA&redirect_uri=https://github.com/Reddi2Mingle/Reddi2MingleMVP&code=-LClI7rjt6HmF0D9eZ5zdazIdbg&grant_type=authorization_code

{
  "access_token": "0o-GYyATFneYzEbYaFXZw2Y3gmI",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "60687835-Jcfr45LjrMb6zp5I-zOJ71aRJic",
  "scope": "identity"
}

var GET for_details =
https://@oauth.reddit.com/api/v1/me

var POST for_1_hour_access =
https://ssl.reddit.com/api/v1/access_token