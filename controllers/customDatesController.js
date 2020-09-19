const db = require('../models');
const textControl = require('./textController');

// Defining methods for the nudgesController
module.exports = {
  findAll: (req, res) => {
    db.CustomDate.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err.message));
  },
  findById: (req, res) => {
    db.CustomDate.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err.message));
  },
  create: (req, res) => {
    db.CustomDate.create(req.body)
      .then(dateData => {
        return db.User.findOneAndUpdate(
          { _id: req.user._id },
          { $push: { customDates: dateData._id } },
          { new: true }
        ).populate('customDates');
      })
      .then(dbModel => {
        const [newestDate] = dbModel.customDates.slice(-1);
        res.json(newestDate);
      })
      .catch(err => res.status(422).json(err.message));
  },
  update: (req, res) => {
    db.CustomDate.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    })
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err.message));
  },
  remove: (req, res) => {
    db.CustomDate.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err.message));
  }
};
