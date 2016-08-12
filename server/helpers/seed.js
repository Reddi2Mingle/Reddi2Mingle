const seraph = require('seraph');
const model = require('seraph-model');

const db = require('../db/config').db;

const Person = model(db, 'person');
const Subreddit = model(db, 'subreddit');

Person.setUniqueKey('redditID');

const peopleSubs = [
  {
    redditID: 0,
    name: 'Neil Whitehead',
    picture: 'insertpicofneil.gif',
    subs: [
      { name: '/r/fatpeoplestories', readers: 1000000 },
      { name: '/r/BlackPeopleTwitter', readers: 123 },
      { name: '/r/malefashionadvice', readers: 579003 },
    ],
  },
  { redditID: 1,
    name: 'Jeremy Toce',
    picture: 'insertpicofjeremy.gif',
    subs: [
      { name: '/r/LucidDreaming', readers: 49301 },
      { name: '/r/malefashionadvice', readers: 579003 },
      { name: '/r/glutenfree', readers: 94592 },
    ],
  },
  { redditID: 2,
    name: 'Tyler Becks',
    picture: 'insertpicoftyler.gif',
    subs: [
      { name: '/r/LifeProTips', readers: 8230648 },
      { name: '/r/malefashionadvice', readers: 579003 },
    ],
  },
  { redditID: 3,
    name: 'Sunny Singh',
    picture: 'insertpicofsunny.gif',
    subs: [
      { name: '/r/fatpeoplestories', readers: 1000000 },
      { name: '/r/malefashionadvice', readers: 579003 },
      { name: '/r/LifeProTips', readers: 8230648 },
    ],
  },
  { redditID: 4,
    name: 'Casper Holgreen',
    picture: 'insertpicofcasper.gif',
    subs: [
      { name: '/r/PacificCrestTrail', readers: 1432 },
      { name: '/r/EvolveSustain', readers: 1345 },
    ],
  },
  { redditID: 5,
    name: 'Trevor Healy',
    picture: 'insertpicofhealy.gif',
    subs: [
      { name: '/r/glutenfree', readers: 94592 },
      { name: '/r/Shirtoftheday', readers: 2315 },
    ],
  },
  { redditID: 6,
    name: 'Sompop Corn',
    picture: 'insertpicofpoppop.gif',
    subs: [
      { name: '/r/dadjokes', readers: 274865 },
    ],
  },
  { redditID: 7,
    name: 'Jay Arella',
    picture: 'insertpicofjay.gif',
    subs: [
      { name: '/r/photography', readers: 94592 },
      { name: '/r/dadjokes', readers: 274865 },
    ],
  },
  { redditID: 8,
    name: 'David Ludgren',
    picture: 'insertpicofdavid.gif',
    subs: [
      { name: '/r/Zimbabwe', readers: 960 },
      { name: '/r/Cricket', readers: 6133 },
      { name: '/r/dadjokes', readers: 274865 },
    ],
  },
  { redditID: 9,
    name: 'Shea Hawkins',
    picture: 'insertpicofshea.gif',
    subs: [
      { name: '/r/Zimbabwe', readers: 960 },
      { name: '/r/glutenfree', readers: 94592 },
      { name: '/r/EvolveSustain', readers: 1345 },
    ],
  },
];


Person.findAll((err, allPeople) => {
  if (err) {
    console.log('error out:', err);
  } else {
    // populate local machine database if empty
    if (allPeople.length === 0) {
      Person.compose(Subreddit, 'subs', 'FOLLOWS', { many: true });
      Subreddit.setUniqueKey('name', true, () => {
        // for (var per of peopleSubs) {
        //   Person.save(per, (err, saved) => {
        //     if (err) {
        //       console.log('error in saving: ', per, 'because of ERROR:', err);
        //     } else {
        //       db.relationships(saved, (err, rels) => {
        //         console.log('Relationship saved:', rels);
        //       });
        //     }
        //   });
        // }
        for (var i = 0; i < peopleSubs.length; i++) {
          var per = peopleSubs[i];

          Person.save(per, (err, saved) => {
            if (err) {
              console.log('error in saving: ', per, 'because of ERROR:', err);
            } else {
              db.relationships(saved, (err, rels) => {
                console.log('Relationship saved:', rels);
              });
            }
          });
        }
      });
    }
  }
});
