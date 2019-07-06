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
  return client.messages.create({
    body: `You have activated your ${
      nudge.name
    } Nudge. A reminder text will be sent once every ${nudge.nudgeFrequency} ${
      nudge.nudgeFrequencyUnit
    } that will read "${nudge.textMessage}".`,
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

module.exports = {
  toggle: function(req, res) {
    db.Nudge.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  activate: function(req, res) {
    const nudge = req.body.nudge;
    const { nudgeFrequency, nudgeFrequencyUnit, textMessage } = nudge;
    const { phone } = req.body.user;
    const milliseconds = frequencyToMilliseconds(
      nudgeFrequency,
      nudgeFrequencyUnit
    );

    db.Nudge.findOneAndUpdate({ _id: req.params.id }, nudge)
      .then(dbModel => {
        if (nudge.activated) {
          activateMessage(nudge, phone);
          intervals[nudge._id] = setInterval(() => {
            console.log(textMessage);
            //   sendText(textMessage, phone);
          }, milliseconds);
          res.json({ msg: `${nudge.name} Activated`, milliseconds, dbModel });
        } else {
          clearInterval(intervals[nudge._id]);
          res.json({ msg: `${nudge.name} Deactivated`, dbModel });
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
        const { nudgeFrequency, nudgeFrequencyUnit, textMessage } = nudge;
        const milliseconds = frequencyToMilliseconds(
          nudgeFrequency,
          nudgeFrequencyUnit
        );
        if (nudge.activated) {
          intervals[nudge._id] = setInterval(() => {
            console.log(textMessage);
            //   sendText(textMessage, phone);
          }, milliseconds);
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
