const db = require('../models');
const fn = require('../scripts/fn');

// Defining methods for the nudgesController
module.exports = {
  findAll: function(req, res) {
    db.Nudge.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Nudge.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    const userId = req.body.userId;
    const newNudge = req.body.nudge;
    console.log('userId: ', userId);
    console.log('newNudge: ', newNudge);
    db.Nudge.create(newNudge)
      .then(function(nudgeData) {
        return db.User.findOneAndUpdate(
          { _id: userId },
          { $push: { nudges: nudgeData._id } },
          { new: true }
        );
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Nudge.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbModel => {
        const { _id, nudgeFrequency, nudgeFrequencyUnit, activated } = dbModel;
        if (activated) {
          const milliseconds = fn.frequencyToMilliseconds(
            nudgeFrequency,
            nudgeFrequencyUnit
          );
          db.User.findOne({
            nudges: { $in: _id }
          }).then(userModel => {
            const { phone } = userModel;
            fn.textRecursiveTimeout(dbModel, milliseconds, phone);
          });
          // .catch(err => res.status(422).json(err));
        }
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Nudge.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
