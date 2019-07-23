require('dotenv').config();
const db = require('../models');

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

function frequencyToMilliseconds(nudgeFrequency, nudgeFrequencyUnit) {
  switch (nudgeFrequencyUnit) {
    case 'seconds':
      return nudgeFrequency * 1000;
      break;
    case 'minutes':
      return nudgeFrequency * 60 * 1000;
      break;
    case 'hours':
      return nudgeFrequency * 3600 * 1000;
      break;
    case 'days':
      return nudgeFrequency * 86400 * 1000;
      break;
    case 'weeks':
      return nudgeFrequency * 604800 * 1000;
      break;
    case 'months':
      return nudgeFrequency * 2419200 * 1000;
      break;
    case 'years':
      return nudgeFrequency * 31449600 * 1000;
      break;
    default:
      return nudgeFrequency * 60480 * 1000;
  }
}

function textRecursiveTimeout(nudge, milliseconds, phone) {
  const { _id, nudgeFrequency, nudgeFrequencyUnit, textMessage } = nudge;
  const randomFrequency = Math.floor(Math.random() * nudgeFrequency) + 1;
  console.log('randomFrequency', randomFrequency);
  const randomMilliseconds = (milliseconds * randomFrequency) / nudgeFrequency;
  intervals[_id] = setTimeout(() => {
    console.log(textMessage);
    sendText(textMessage, phone);
    clearTimeout(intervals[_id]);
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
    const milliseconds = frequencyToMilliseconds(
      nudgeFrequency,
      nudgeFrequencyUnit
    );

    db.Nudge.findOneAndUpdate({ _id: req.params.id }, nudge, { new: true })
      .then(dbModel => {
        if (activated) {
          activateMessage(nudge, phone);
          textRecursiveTimeout(nudge, milliseconds, phone);
          res.json({ msg: `${name} Activated`, milliseconds, dbModel });
        } else {
          clearInterval(intervals[_id]);
          res.json({ msg: `${name} Deactivated`, dbModel });
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
          const milliseconds = frequencyToMilliseconds(
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
            .catch(err => res.status(422).json(err));
        }
      });
    });
  },
  send: function(req, res) {
    const { phone, textMessage } = req.body;

    sendText(textMessage, phone).then(message => {
      console.log(message.sid);
      res.json({ msg: 'Test Text Successfully Sent' });
    });
  }
};
