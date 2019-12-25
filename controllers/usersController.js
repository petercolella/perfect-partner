const db = require('../models');
const textControl = require('./textController');

// Defining methods for the usersController
module.exports = {
  findAll: function(req, res) {
    db.User.find(req.query)
      .populate('nudges')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err.message));
  },
  findById: function(req, res) {
    if (req.user._id != req.params.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    db.User.findById(req.params.id)
      .populate('nudges')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err.message));
  },
  create: function(req, res) {
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err.message));
  },
  update: function(req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true
    })
      .then(dbModel => {
        if (req.body.hasOwnProperty('phone')) {
          const updateBody = `Welcome to Perfect Partner, ${dbModel.firstName}!`;
          textControl.sendText(updateBody, dbModel.phone);
        }
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err.message));
  },
  remove: function(req, res) {
    db.User.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err.message));
  }
};
