const neo4j = require('neo4j');
const db = new neo4j.GraphDatabase('http://neo4j:neo4j@localhost:7474');

module.exports = {
  //returns array of matches for user
	showMatches: (req, res) => {
    // params: redditId, potentialId, swipe (need from client)
    let r = req.query;
    let user = r.redditId;
    // console.log('r',r,'user',user)

    db.cypher({
      query: `MATCH (user:Person {redditId: ${user}})-[r:MATCH]-(matched:Person) RETURN matched`
    }, function(err, matched) {
      if (err) {
        console.log('Error in finding potential interest for user:',err);
      } else {
        matched = matched.reduce(function(prev, cur) {
          var person = cur.matched.properties;
          prev[person.name] = person;
          return prev;
        },{})
        console.log('matched',matched)
        res.send(matched)
        }
    });
    // Example response:
    // [
    //   {
    //     "matched": {
    //       "_id": 16,
    //       "labels": [
    //         "Person"
    //       ],
    //       "properties": {
    //         "name": "Sompop Corn",
    //         "photo": "https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png",
    //         "redditId": "6"
    //       }
    //     }
    //   },
    //   {
    //     "matched": {
    //       "_id": 15,
    //       "labels": [
    //         "Person"
    //       ],
    //       "properties": {
    //         "name": "Trevor Healy",
    //         "photo": "https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png",
    //         "redditId": "5"
    //       }
    //     }
    //   }
    // ]
  }
}