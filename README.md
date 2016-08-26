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
1. [Architecture](#architecture)
1. [API](#api)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Roadmap](#roadmap)
1. [Contributing](#contributing)
1. [Deployment](#deployment)

<hr>

## Usage

Use your reddit account to sign up for the application. Set your preferences and gender to start meeting others with common interests 

<hr>

## Requirements

- React x15.3.0
- Redux x3.5.2
- Node x6.2.2
- Express
- Neo4j-js 
- MySQL 

<hr>
## Architecture
### High Level Architecture
![](http://i.imgur.com/SKdjwEE.png))

### Application Flow
![](http://i.imgur.com/zpbBZj0.png))

<hr>

## API

##### Client
|Purpose|URL|
|---|---|
|Sign-Up|/signup|
|Login|/login|
|Create Password|/createPassword|
|Set Preferences|/preferences|
|Upload Photo|/photoUpload|
|Match with Users|/matchmaker|
|User Profile|/profile|
|Matches|/matches|


##### Server
|Purpose|URL|Method|Body|
|---|---|:---:|---|
|Authentication|/auth|GET| - |
|Authentication|/auth/reddit |GET| - |
|Authentication|/auth/reddit/callback|GET| - |
|Get User Info|/api/userInfo/?redditId=| GET | - |
|Update Password|/api/userInfo/updatePassword| POST | {redditId, password} |
|Save Preferences|/api/userInfo/addPreference| POST | {redditId, gender, preference} |
|Save Photo URL|/api/userInfo/addPhoto| POST | {redditId, photo} |
|Verify Login|/api/userInfo/loginCredentials| POST | {username, password}|
|Receive Potentials|/api/potentials/?redditId=| GET | - |
|Create Potentials (?)|/api/potentials/createPotentials| POST | {redditId}
|Save Swipe Decision|/api/swipe| POST | {redditId, potentialId, swipeDecision}
|Get Matches|/api/swipe/matches|  GET | - |

|API Call|Response|
|---|---|
|/api/userInfo|{ id, redditId, name, photo, gender, preference, deliveredDownvotes, deliveredUpvotes, receivedDownvotes, receivedUpvotes, commentKarma, postKarma, trophyCount, subreddits: [] }|
|api/userInfo/loginCredentials| {redditId} |
|api/potentials| [{redditId, photo, common_subreddits: []}, redditId, photo, common_subreddits: []}, redditId, photo, common_subreddits: []}]|
|api/swipes/matches| [{redditID, name, photo, common_subreddits}]|


### Roadmap

View the project roadmap [here](https://trello.com/b/4jhzq2yx/thesis-scrum-board)

## Deployment
This has been deployed onto AWS using Docker containers. The backend architecture allows horizontal scaling of the user server to handle higher loads.

