const db = require('../models');
const textControl = require('./textController');
const { DateTime } = require('luxon');

// Defining methods for the usersController
module.exports = {
  findAll: (req, res) => {
    db.User.find(req.query)
      .populate('customDates')
      .populate('nudges')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err.message));
  },
  findById: (req, res) => {
    if (req.user._id != req.params.id) {
      return res.status(403).json('Forbidden');
    }

    db.User.findById(req.params.id)
      .populate('customDates')
      .populate('nudges')
      .then(dbModel => {
        const { googleId, ...user } = dbModel._doc;
        res.json(user);
      })
      .catch(err => res.status(422).json(err.message));
  },
  create: (req, res) => {
    db.User.create(req.body)
      .then(dbModel => {
        const { googleId, ...user } = dbModel._doc;
        res.json(user);
      })
      .catch(err => res.status(422).json(err.message));
  },
  update: (req, res) => {
    console.log(
      'anniversaryDate:',
      req.body.anniversaryDate,
      'anniversaryDate.getTimeszoneOffset:',
      DateTime.fromISO(req.body.anniversaryDate).offset
    );
    console.log(
      'birthDate:',
      req.body.birthDate,
      'birthDate.getTimeszoneOffset:',
      DateTime.fromISO(req.body.birthDate).offset
    );

    db.User.findOne({ phone: req.body.phone }).then(dbModel => {
      if (dbModel && dbModel._id == req.params.id) {
        const { phone, ...rest } = req.body;
        req.body = rest;
      }

      db.User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
      })
        .populate('customDates')
        .populate('nudges')
        .then(dbModel => {
          if (req.body.hasOwnProperty('phone')) {
            const updateBody = `Welcome to Perfect Partner, ${dbModel.firstName}!`;
            textControl.sendText(updateBody, dbModel.phone);
          }
          const { googleId, ...user } = dbModel._doc;
          res.json(user);
        })
        .catch(err => res.status(422).json(err.message));
    });
  },
  remove: (req, res) => {
    if (req.user._id != req.params.id) {
      return res.status(403).json('Forbidden');
    }

    db.User.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => {
        const { googleId, ...user } = dbModel._doc;
        res.json(user);
      })
      .catch(err => res.status(422).json(err.message));
  }
};
