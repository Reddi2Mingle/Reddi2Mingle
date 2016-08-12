const seraph = require("seraph");
const model = require('seraph-model');
const db = require('../server').db
const Person = model(db, 'person');
const Subreddit = model(db, 'subreddit');

Person.setUniqueKey('redditID');

var peopleSubs = [
  { redditID: 00000, 
    name: 'Neil Whitehead', 
    picture: 'insertpicofneil.gif', 
    subs: [{ name: '/r/fatpeoplestories', readers: 1000000 },
      { name: '/r/BlackPeopleTwitter', readers: 123 },
      { name: '/r/malefashionadvice', readers: 579003 }
    ]
  },
  { redditID: 00001, 
    name: 'Jeremy Toce', 
    picture: 'insertpicofjeremy.gif',
    subs: [
      { name: '/r/LucidDreaming', readers: 49301 },
      { name: '/r/malefashionadvice', readers: 579003 },
      { name: '/r/glutenfree', readers: 94592 }
    ]
  },
  { redditID: 00002, 
    name: 'Tyler Becks', 
    picture: 'insertpicoftyler.gif',
    subs: [
      { name: '/r/LifeProTips', readers: 8230648 },
      { name: '/r/malefashionadvice', readers: 579003 }
    ]
  },
  { redditID: 00003, 
    name: 'Sunny Singh', 
    picture: 'insertpicofsunny.gif',
    subs: [
      { name: '/r/fatpeoplestories', readers: 1000000 },
      { name: '/r/malefashionadvice', readers: 579003 },
      { name: '/r/LifeProTips', readers: 8230648 }
    ]
  },
  { redditID: 00004, 
    name: 'Casper Holgreen', 
    picture: 'insertpicofcasper.gif',
    subs: [
      { name: '/r/PacificCrestTrail', readers: 1432 },
      { name: '/r/EvolveSustain', readers: 1345 }
    ]
  },
  { redditID: 00005, 
    name: 'Trevor Healy', 
    picture: 'insertpicofhealy.gif',
    subs: [
      { name: '/r/glutenfree', readers: 94592 },
      { name: '/r/Shirtoftheday', readers: 2315 }
    ]
  },
  { redditID: 0006, 
    name: 'Sompop Corn', 
    picture: 'insertpicofpoppop.gif',
    subs: [
      { name: '/r/dadjokes', readers: 274865 }
    ]
  },
  { redditID: 00007, 
    name: 'Jay Arella', 
    picture: 'insertpicofjay.gif',
    subs: [
      { name: '/r/photography', readers: 94592 },
      { name: '/r/dadjokes', readers: 274865 }
    ]
  },
  { redditID: 00008, 
    name: 'David Ludgren', 
    picture: 'insertpicofdavid.gif',
    subs: [
      { name: '/r/Zimbabwe', readers: 960 },
      { name: '/r/Cricket', readers: 6133 },
      { name: '/r/dadjokes', readers: 274865 }
    ]
  },
  { redditID: 00009, 
    name: 'Shea Hawkins', 
    picture: 'insertpicofshea.gif',
    subs: [
      { name: '/r/Zimbabwe', readers: 960 },
      { name: '/r/glutenfree', readers: 94592 },
      { name: '/r/EvolveSustain', readers: 1345 }
    ]
  }
];


Person.findAll(function(err, allPeople) {
  if (err) {
    console.log("error out:",err)
  } else {

    //populate local machine database if empty
    if (allPeople.length === 0) {

      Person.compose(Subreddit, 'subs', 'FOLLOWS', {many: true})
      Subreddit.setUniqueKey('name', true, function() {
        
        for (var i = 0; i < peopleSubs.length; i++) {
          var per = peopleSubs[i];
          
          Person.save(per, function(err, saved) {
            if (err) {
              console.log("error in saving: ",per,"because of ERROR:",err);
            } else {
              db.relationships(saved, function(err, rels) {
                console.log('Relationship saved:',rels);
              })
            }
          })
        }
      });
    }
  }
});


