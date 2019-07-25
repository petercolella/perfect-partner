require('dotenv').config();
const db = require('../models');
const fn = require('../scripts/fn');

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const intervals = {};

function activateMessage(nudge, to) {
  const { name, nudgeFrequency, nudgeFrequencyUnit, textMessage } = nudge;
  return client.messages.create({
    body: `You have activated your ${name} Nudge. A reminder text will be sent randomly every ${nudgeFrequency} ${nudgeFrequencyUnit} that will read "${textMessage}".`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+1${to}`
  });
}

function sendText(body, to) {
  return client.messages.create({
    body: `${body}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+1${to}`
  });
}

function textRecursiveTimeout(nudge, milliseconds, phone) {
  const { _id, nudgeFrequency, nudgeFrequencyUnit, textMessage } = nudge;
  const randomFrequency = Math.floor(Math.random() * nudgeFrequency) + 1;
  console.log('randomFrequency', randomFrequency);
  const randomMilliseconds = (milliseconds * randomFrequency) / nudgeFrequency;
  clearTimeout(intervals[_id]);
  intervals[_id] = setTimeout(() => {
    console.log(textMessage);
    sendText(textMessage, phone);
    textRecursiveTimeout(nudge, milliseconds, phone);
  }, randomMilliseconds);
}

module.exports = {
  toggle: function(req, res) {
    db.Nudge.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  activate: function(req, res) {
    const nudge = req.body.nudge;
    const {
      _id,
      name,
      nudgeFrequency,
      nudgeFrequencyUnit,
      textMessage,
      activated
    } = nudge;
    const { phone } = req.body.user;
    const milliseconds = fn.frequencyToMilliseconds(
      nudgeFrequency,
      nudgeFrequencyUnit
    );

    db.Nudge.findOneAndUpdate({ _id: req.params.id }, nudge, { new: true })
      .then(dbModel => {
        if (activated) {
          activateMessage(nudge, phone);
          textRecursiveTimeout(nudge, milliseconds, phone);
          res.json({ msg: `${name} Activated`, activated: dbModel.activated });
        } else {
          clearInterval(intervals[_id]);
          res.json({
            msg: `${name} Deactivated`,
            activated: dbModel.activated
          });
        }
      })
      .catch(err => res.status(422).json(err));
  },
  runActivatedNudges: function() {
    db.Nudge.find({}, (err, nudges) => {
      if (err) {
        console.log({ error: err.message });
      }
      nudges.forEach(nudge => {
        const { _id, nudgeFrequency, nudgeFrequencyUnit, activated } = nudge;
        if (activated) {
          const milliseconds = fn.frequencyToMilliseconds(
            nudgeFrequency,
            nudgeFrequencyUnit
          );
          db.User.findOne({
            nudges: { $in: _id }
          })
            .then(userModel => {
              const { phone } = userModel;
              textRecursiveTimeout(nudge, milliseconds, phone);
            })
            .catch(err => console.log('Error: ', err.message));
        }
      });
    });
  },
  send: function(req, res) {
    const { phone, textMessage } = req.body;

    fn.sendText(textMessage, phone).then(message => {
      console.log(message.sid);
      res.json({ msg: 'Test Text Successfully Sent' });
    });
  }
};
