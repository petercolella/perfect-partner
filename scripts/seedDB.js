const mongoose = require('mongoose');
const db = require('../models');

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pp');

const userSeed = [
  {
    name: "John Doe",
  phone: "4047985220",
  nudgeFrequency: 5000,
  partnerName: "Jane",
  anniversaryDate: "November 9, 2013",
  birthDate: "February 14, 1983"
  },
  {
    name: 'Peter Colella',
    phone: '4047841090',
    nudgeFrequency: 5000,
    partnerName: 'TBD',
    anniversaryDate: 'N/A',
    birthDate: 'N/A'
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
