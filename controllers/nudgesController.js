const db = require('../models');
const textControl = require('./textController');

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
        ).populate('nudges');
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Nudge.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbModel => {
        const {
          _id,
          name,
          nudgeFrequency,
          nudgeFrequencyUnit,
          textMessage,
          activated
        } = dbModel;

        const updateBody =
          nudgeFrequency > 1
            ? `You have updated your ${name} Nudge to a frequency of once every 1 - ${nudgeFrequency} ${nudgeFrequencyUnit} with the message, "${textMessage}"`
            : `You have updated your ${name} Nudge to a frequency of once every ${nudgeFrequencyUnit.substring(
                0,
                nudgeFrequencyUnit.length - 1
              )} with the message, "${textMessage}"`;

        if (activated) {
          textControl.setFutureTimestamp(dbModel);
        }

        db.User.findOne({
          nudges: { $in: _id }
        }).then(userModel => {
          const { phone } = userModel;
          textControl.sendText(updateBody, phone);
        });

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
