const seraph = require('seraph');
const model = require('seraph-model');

const db = require('../db/config').db;

const Person = model(db, 'Person');
const Subreddit = model(db, 'Subreddit');

Person.setUniqueKey('redditId');

const peopleSubs = [
  {
    redditId: 0,
    name: 'Neil Whitehead',
    photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
    subs: [
      { name: '/r/fatpeoplestories', readers: 1000000 },
      { name: '/r/BlackPeopleTwitter', readers: 123 },
      { name: '/r/malefashionadvice', readers: 579003 },
    ],
  },
  { redditId: 1,
    name: 'Jeremy Toce',
    photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
    subs: [
      { name: '/r/LucidDreaming', readers: 49301 },
      { name: '/r/malefashionadvice', readers: 579003 },
      { name: '/r/glutenfree', readers: 94592 },
    ],
  },
  { redditId: 2,
    name: 'Tyler Becks',
    photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
    subs: [
      { name: '/r/LifeProTips', readers: 8230648 },
      { name: '/r/malefashionadvice', readers: 579003 },
    ],
  },
  { redditId: 3,
    name: 'Sunny Singh',
    photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
    subs: [
      { name: '/r/fatpeoplestories', readers: 1000000 },
      { name: '/r/malefashionadvice', readers: 579003 },
      { name: '/r/LifeProTips', readers: 8230648 },
    ],
  },
  { redditId: 4,
    name: 'Casper Holgreen',
    photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
    subs: [
      { name: '/r/PacificCrestTrail', readers: 1432 },
      { name: '/r/EvolveSustain', readers: 1345 },
    ],
  },
  { redditId: 5,
    name: 'Trevor Healy',
    photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
    subs: [
      { name: '/r/glutenfree', readers: 94592 },
      { name: '/r/Shirtoftheday', readers: 2315 },
    ],
  },
  { redditId: 6,
    name: 'Sompop Corn',
    photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
    subs: [
      { name: '/r/dadjokes', readers: 274865 },
    ],
  },
  { redditId: 7,
    name: 'Jay Arella',
    photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
    subs: [
      { name: '/r/photography', readers: 94592 },
      { name: '/r/dadjokes', readers: 274865 },
    ],
  },
  { redditId: 8,
    name: 'David Ludgren',
    photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
    subs: [
      { name: '/r/Zimbabwe', readers: 960 },
      { name: '/r/Cricket', readers: 6133 },
      { name: '/r/dadjokes', readers: 274865 },
    ],
  },
  { redditId: 9,
    name: 'Shea Hawkins',
    photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
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
