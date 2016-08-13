# Reddi2MingleMVP

#How to start this application
1. `npm install`
2. `npm run server` (one tab)
3. `npm run watch` (another tab)




API Calls:

SERVER SIDE
1. Route: app.get('/auth/reddit', authController.crypto);
Action: 
Input:
Output:
2. Route:  app.get('/auth/reddit/callback', passport.authenticate('reddit', { failureRedirect: '/signup'}), authController.login);
Action: 
Input: 
Output: 
3. Route: app.get('/dummyData', userController.sendDummyData);
Action: 
Input:
Output:
4. Route: app.get('/userInfo', userController.queryUserInfo);
Action: 
Input:
Output:
5. Route: app.get('/subreddits', userController.createUserSubreddits);
Action: 
Input:
Output:
6. Route: app.get('/potentials', potentialController.queryPotentials);
Action: 
Input:
Output:
7. Route: app.post('/swipe', swipeController.likeResponse);
Action: 'POST' 
Input: redditId, potentialId, swipe
Output: 
 - Relationship created (INTEREST || MATCH || NEVER)
[
  {
    "_id": 36,
    "type": "NEVER",
    "properties": {},
    "_fromId": 18,
    "_toId": 15
    }
]


app.get('/createPotentials', potentialController.createPotentials);

app.get('/match', matchController.showMatches)