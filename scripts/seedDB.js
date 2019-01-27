const mongoose = require("mongoose");
const db = require("../models");

// This file empties the users collection and the nudge collection and inserts the respective info below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/pp"
);

const userSeed = [
  {
  name: "John Doe",
  phone: "4047985220",
  partnerName: "Jane",
  anniversaryDate: "November 9, 2013",
  birthDate: "February 14, 1983"
  }
  
];

const nudgeSeed = [
  {
  name: "Romantic Text",
  nudgeFrequency: 5000,
  textMessage: "I'm thinking about you!"
  }
  
];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " user records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


  db.Nudge.deleteMany({})
  .then(() => db.Nudge.collection.insertMany(nudgeSeed))
  .then(data => {
    console.log(data.result.n + " nudge records inserted!");
    process.exit(0);

  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });