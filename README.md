# Reddi2Mingle
Tinder for Redditors 

<hr>

## Team

  - __Scrum Master__: Tyler Becks
  - __Development Team Members__: [Tyler Becks](https://github.com/tylerbecks), [Christine Chou](https://github.com/christinechou), [Jennifer Ong](https://github.com/jbarbettini), [Neil Whitehead](https://github.com/n-white)

<hr>

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Roadmap](#roadmap)
1. [Contributing](#contributing)
1. [Architecture](#architecture)
1. [API](#api)
1. [Deployment](#deployment)

<hr>

## Usage

Use your reddit account to sign up for the application. Set your preferences and gender to start meeting others with common interests 

<hr>

## Requirements

- React x15.3.0
- Redux x3.5.2
- Node x6.2.2
- Express -
- Neo4j-js x0.0.8
- MySQL 

## API
##### Public End Points
|Purpose|URL|Query String|Method|Body|
|---|---|---|---|---|
|Sign-Up|/signup|   |
|Login|/login|   |
|Set Preferences|/preferences|   |
|Upload Photo|/photo||
|Match with Users|/matchmaker|
|User Profile|/profile||
|Matches|/matches||
|Authorization|/auth| ? |GET| - |
|Authorization|/auth/reddit| ? |GET| - |
|Authorization|/auth/reddit/callback| ? |GET| - |
|Get User Info|/api/userInfo| ?redditId= | GET | - |
|Update Password|/api/userInfo/updatePassword|   | POST |
|Save Preferences|/api/userInfo/addPreference|   | POST |
|Save Photo URL|/api/userInfo/addPhoto|   | POST |
|Update Password|/api/userInfo/loginCredentials|   | POST |
|Receive Potentials|/api/potentials|   | GET | - |
|Create Potentials|/api/potentials/createPotentials|   | POST |
|Save Swipe Decision|/api/swipe|   |  POST |
|Get Matches|/api/swipe/matches|   |  GET | - |




##### Admin Only
|Request|URL|Response|
|---|---|---|
|GUI Access to Database|/addProblemsSolutions.html|   |
|Add Challenge|/api/challenges|challengeObj|
|Get Random Challenge|/api/challenges|challengeObj|
|Add User|/api/users|userObj|
|Empty Database|/api/resetDB|   |
|Reseed Database|/api/resetDBWithData|   |
|Reseed Challenges Table|/api/resetChallenges|   |

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
6. Route: app.get('/createPotentials', potentialController.createPotentials);


7. Route: app.get('/potentials', potentialController.queryPotentials);
Action: 
Input:
Output:
8. Route: app.post('/swipe', swipeController.likeResponse);
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

9. Route: app.get('/match', matchController.showMatches)
Action:
Input:
Output:
  [
    {
      "name": "Jay Arella",
      "photo": "https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png",
      "redditId": "7"
    },
    {
      "name": "Shea Hawkins",
      "photo": "https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png",
      "redditId": "9"
    }
  ]