const neo4j = require('neo4j');
const keys = require('./api_keys');
const bluebird = require('bluebird');
const db = new neo4j.GraphDatabase(`http://${keys.NEO4J_USERNAME}:${keys.NEO4J_PW}@${keys.NEO4J_HOST}:7474`);

var female = ['PATRICIA','LINDA','BARBARA','ELIZABETH','JENNIFER'];
var male = ['CHARLIE','TYLER','GILBERT','GENE','MARC','REGINALD'];
var queryForNames = "curl http://deron.meranda.us/data/census-dist-female-first.txt |    awk '{print $1}'"
var subreddits = ['streetart', 'sanfrancisco', 'jokes', 'malefashionadvice', 'rage', 'MorbidReality', 'cringe', 'nostalgia', 'aww', 'showerthoughts', 'funny', 'LifeProTips', 'PacificCrestTrail', 'EvolveSustain', 'glutenfree', 'dadjokes', 'photography', 'Cricket', 'glutenfree', 'gaming', 'DaftPunk', 'facepalm', 'MapPorn', 'tattoos', 'lifehacks'];
var subredditLength = subreddits.length;
var photo = ['http://res.cloudinary.com/dkzcwlehr/image/upload/v1472247969/photo-1441123100240-f9f3f77ed41b_y2kdek.jpg',
'http://res.cloudinary.com/dkzcwlehr/image/upload/v1472247988/photo-1464746133101-a2c3f88e0dd9_f6eidp.jpg',
'http://res.cloudinary.com/dkzcwlehr/image/upload/v1472248050/photo-1414202251636-d05ac44c0182_zuz6pp.jpg',
'http://res.cloudinary.com/dkzcwlehr/image/upload/v1472248117/photo-1428949230486-4f567a30819c_cddgak.jpg',
'http://res.cloudinary.com/dkzcwlehr/image/upload/v1472248076/photo-145311012429066-0cbf536ccaf2_mp9wq7.jpg'];
var photoLength = photo.length;
var newFemale = [];
var newMale = [];



// MAKE LIST OF FEMALE USERS
female.forEach(function(name, index) {
	index = index + 10;
	if (index % 13 === 0) {
		preference = 'woman';
	} else if (index % 100 === 0) {
		preference = 'both';
	} else {
		preference = 'man';
	}

	var subs = [];

	for (var i = 0; i < 3; i++) {
		subs.push({name: subreddits[Math.floor(Math.random() * subredditLength)]});
	}

	var obj = {
		redditId: index.toString(),
		name: name,
		photo: photo[Math.floor(Math.random() * photoLength)],
		gender: 'woman',
		preference: preference,
		subs: subs
	}

	newFemale.push(obj);

})

var numOfWomen = newFemale.length;

// MAKE LIST OF MALE USERS
male.forEach(function(name, index) {
	index = index + numOfWomen;
	if (index % 13 === 0) {
		preference = 'man';
	} else if (index % 100 === 0) {
		preference = 'both';
	} else {
		preference = 'woman';
	}

	var subs = [];

	for (var i = 0; i < 3; i++) {
		subs.push({name: subreddits[Math.floor(Math.random() * subredditLength)]});
	}

	var obj = {
		redditId: index.toString(),
		name: name,
		photo: photo[Math.floor(Math.random() * photoLength)],
		gender: 'man',
		preference: preference,
		subs: subs
	}

	newMale.push(obj);

})

var everyone = newFemale.concat(newMale);
var everyoneLength = everyone.length - 1;

// console.log(everyone);

const savePerson = (person) => (
  // var newObj = {
  //   sub1: person.subs[0].name,
  //   sub2: person.subs,
  //   sub3: person.subs,
  // }
  // console.log(newObj);
  new Promise((resolve, reject) => {
    db.cypher({
      query: 'MERGE (user:Person { redditId: {redditId}, type: "fake" }) \
      ON CREATE SET user.name = {username} \
      ON CREATE SET user.redditId = {redditId} \
      ON CREATE SET user.photo = {photo} \
      ON CREATE SET user.gender = {gender} \
      ON CREATE SET user.preference = {preference} \
			MERGE (s1:Subreddit { name: {sub1}}) \
			MERGE (s2:Subreddit { name: {sub2}}) \
			MERGE (s3:Subreddit { name: {sub3}}) \
			MERGE (user)-[:FOLLOWS]->(s1) \
			MERGE (user)-[:FOLLOWS]->(s2) \
			MERGE (user)-[:FOLLOWS]->(s3) \
      RETURN user, s1, s2, s3;',
      params: {
      	redditId: person.redditId,
        username: person.name,
        photo: person.photo,
        gender: person.gender,
        preference: person.preference,
        sub1: person.subs[0].name,
        sub2: person.subs[1].name,
        sub3: person.subs[2].name,
      },
    }, (err, newPerson) => {
      if (err) {
        console.log('server/userController.js 74: error');
        reject(err);
      } else {
				console.log('30149832714093287410978234017234', newPerson[0])
        resolve('next');
      }
    });
  })
);

const recursiveAdd = (allPeople) => {
	// console.log(allPeople[0])
	savePerson(allPeople[0])
	.then(function() {
		if (allPeople.length === 1) {
			return;
		} else {
			// console.log('hey');
			recursiveAdd(allPeople.slice(1));
		}
	})
};

recursiveAdd(everyone);

// setTimeout(() => {recursiveAdd(everyone)}, 5000);
