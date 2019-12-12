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

const self = (module.exports = {
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
          const activateBody =
            nudgeFrequency > 1
              ? `You have activated your ${name} Nudge. A reminder text will be randomly sent every one to ${nudgeFrequency} ${nudgeFrequencyUnit} with the message, "${textMessage}"`
              : `You have activated your ${name} Nudge. A reminder text will be sent once every ${nudgeFrequencyUnit.substring(
                  0,
                  nudgeFrequencyUnit.length - 1
                )} with the message, "${textMessage}"`;
          self.sendText(activateBody, phone);
          self.textRecursiveTimeout(nudge, milliseconds, phone);
          res.json({ msg: `${name} Activated`, activated: dbModel.activated });
        } else {
          clearInterval(intervals[_id]);
          const deactivateBody = `You have deactivated your ${name} Nudge. Text reminders will not be sent.`;
          self.sendText(deactivateBody, phone);
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
      self.sendText(
        `runActivatedNudges function in directory: ${__dirname}`,
        '4047841090'
      );
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
              self.textRecursiveTimeout(nudge, milliseconds, phone);
            })
            .catch(err => console.log('Error: ', err.message));
        }
      });
    });
  },
  sendText: function(body, to) {
    return client.messages.create({
      body: `${body}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+1${to}`
    });
    console.log('Body:', body, 'To:', to);
  },
  textRecursiveTimeout: function(nudge, milliseconds, phone) {
    const { _id, nudgeFrequency, nudgeFrequencyUnit, textMessage } = nudge;
    const randomFrequency = Math.floor(Math.random() * nudgeFrequency) + 1;
    console.log('randomFrequency', randomFrequency);
    const randomMilliseconds =
      (milliseconds * randomFrequency) / nudgeFrequency;
    console.log('randomMilliseconds', randomMilliseconds);
    clearTimeout(intervals[_id]);
    intervals[_id] = setTimeout(() => {
      console.log(textMessage);
      self.sendText(textMessage, phone);
      self.textRecursiveTimeout(nudge, milliseconds, phone);
    }, randomMilliseconds);
  },
  toggle: function(req, res) {
    db.Nudge.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  send: function(req, res) {
    const { phone, textMessage } = req.body;

    self.sendText(textMessage, phone).then(message => {
      console.log(message.sid);
      res.json({ msg: 'Test Text Successfully Sent' });
    });
  }
});
