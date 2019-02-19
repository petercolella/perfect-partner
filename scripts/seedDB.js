const mongoose = require('mongoose');
const db = require('../models');

// This file empties the users collection and the nudge collection and inserts the respective info below

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pp');

const userSeed = [
  {
    name: 'John Doe',
    phone: '4047985220',
    partnerName: 'Jane',
    anniversaryDate: 'November 9, 2013',
    birthDate: 'February 14, 1983',
    nudges: [
      {
        name: 'Romantic Text',
        nudgeFrequency: 5000,
        textMessage: "I'm thinking of you."
      },
      {
        name: 'Send Flowers',
        nudgeFrequency: 5000,
        textMessage: 'Send some flowers.'
      },
      {
        name: 'Dinner Reservation',
        nudgeFrequency: 5000,
        textMessage: 'Make a dinner reservation.'
      }
    ]
  }
];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
