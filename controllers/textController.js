require('dotenv').config();
const db = require('../models');
const fn = require('../scripts/fn');

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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
          self.setFutureTimestamp(nudge);
          res.json({ msg: `${name} Activated`, activated: dbModel.activated });
        } else {
          const deactivateBody = `You have deactivated your ${name} Nudge. Text reminders will not be sent.`;
          self.sendText(deactivateBody, phone);
          res.json({
            msg: `${name} Deactivated`,
            activated: dbModel.activated
          });
        }
      })
      .catch(err => res.status(422).json(err.message));
  },
  runActivatedNudges: function() {
    db.Nudge.find({}, (err, nudges) => {
      if (err) {
        console.log({ error: err.message });
      }

      nudges.forEach(nudge => {
        const { _id, textMessage, activated, textTimestamp } = nudge;
        if (activated) {
          const now = Date.now();
          if (now - textTimestamp > 0) {
            db.User.findOne({
              nudges: { $in: _id }
            })
              .then(userModel => {
                const { phone } = userModel;
                self.sendText(textMessage, phone);
                self.setFutureTimestamp(nudge);
              })
              .catch(err => console.log('Error: ', err.message));
          }
        }
      });
    });
  },
  runBirthdayNudges: function() {
    db.User.find({}, (err, users) => {
      if (err) {
        console.log({ error: err.message });
      }

      users.forEach(user => {
        const { birthDate, partnerName, phone } = user;

        const now = Date.now();
        const currentYear = new Date().getFullYear();
        const birthDateThisYear = birthDate
          ? new Date(birthDate).setFullYear(currentYear)
          : null;
        const daysToBirthday = birthDateThisYear
          ? Math.floor((birthDateThisYear - now) / (1000 * 60 * 60 * 24))
          : null;
        const birthDateThisYearString = new Date(
          birthDateThisYear
        ).toDateString();

        console.log(
          'daysToBirthday:',
          daysToBirthday,
          'birthDateThisYearString:',
          birthDateThisYearString
        );

        if (daysToBirthday == 28 || daysToBirthday == -337) {
          self.sendText(
            `Don't forget ${partnerName}'s birthday on ${birthDateThisYearString}! Only four weeks to go!`,
            phone
          );
        }
      });
    });
  },
  sendText: function(body, to) {
    console.log('Body:', body, 'To:', to);
    return client.messages.create({
      body: `${body}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+1${to}`
    });
  },
  setFutureTimestamp: function(nudge) {
    const futureTimestamp = fn.getFutureTimestamp(nudge);
    console.log('futureTimestamp:', new Date(futureTimestamp));

    db.Nudge.findOneAndUpdate(
      { _id: nudge._id },
      { textTimestamp: futureTimestamp },
      { new: true }
    )
      .then(dbModel => {
        console.log(dbModel);
      })
      .catch(err => console.log(err.message));
  },
  toggle: function(req, res) {
    db.Nudge.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err.message));
  },
  send: function(req, res) {
    const { phone, textMessage } = req.body;

    self.sendText(textMessage, phone).then(message => {
      console.log(message.sid);
      res.json({ msg: 'Test Text Successfully Sent' });
    });
  }
});
