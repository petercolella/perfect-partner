require('dotenv').config();
const db = require('../models');

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const intervals = {};

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
    console.log('req.body', req.body);
    // const response = req.body;
    db.Nudge.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    // res.json(response);
  },
  activate: function(req, res) {
    console.log('req.body', req.body);
    const nudge = req.body.nudge;
    console.log('nudge', nudge);
    const nudgeFrequency = nudge.nudgeFrequency;
    const nudgeFrequencyUnit = nudge.nudgeFrequencyUnit;
    const textMessage = nudge.textMessage;
    const phone = req.body.user.phone;
    const milliseconds = frequencyToMilliseconds(
      nudgeFrequency,
      nudgeFrequencyUnit
    );
    intervals[nudge._id] = setInterval(() => {
      console.log('send text');
      //   sendText(textMessage, phone);
    }, milliseconds);

    console.log('nudgeInterval', intervals[nudge._id]);
    // nudge.timerId = nudgeInterval;
    db.Nudge.findOneAndUpdate({ _id: req.params.id }, nudge)
      .then(dbModel =>
        res.json({ msg: 'Nudge Text Avtivated', milliseconds, dbModel })
      )
      .catch(err => res.status(422).json(err));
    // res.json({ msg: 'Nudge Text Avtivated', milliseconds, dbModel });
  },
  send: function(req, res) {
    const phone = req.body.phone;
    const textMessage = req.body.textMessage;

    sendText(textMessage, phone).then(message => {
      console.log(message.sid);
      res.json({ msg: 'Test Text Successfully Sent' });
    });
  }
};
