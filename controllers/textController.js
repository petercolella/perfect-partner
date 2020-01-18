require('dotenv').config();
const db = require('../models');
const fn = require('../scripts/fn');
const { DateTime } = require('luxon');

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// const now = DateTime.fromISO('2020-12-20T08:30:00');
const now = DateTime.local();
const currentYear = now.toFormat('yyyy');
const nowDayOfYear = now.toFormat('o');
const numberOfDaysInYear = DateTime.fromISO(`${currentYear}-12-31`).toFormat(
  'o'
);

function formatDate(date) {
  const dateObj = {};
  const dt = DateTime.fromJSDate(date);
  dateObj.dateDayOfYear = dt.set({ year: currentYear }).toFormat('o');
  dateObj.dateString = dt.toFormat('MMMM d');
  dateObj.yearOfDate = dt.toFormat('yyyy');
  return dateObj;
}

const reminderObj = {
  '1 Week': 7,
  '2 Weeks': 14,
  '30 Days': 30,
  '60 Days': 60,
  '90 Days': 90
};

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
  runAnniversaryNudges: function() {
    db.User.find({}, (err, users) => {
      if (err) {
        console.log({ error: err.message });
      }

      users.forEach(user => {
        const {
          anniversaryDate,
          anniversaryReminders,
          partnerName,
          phone
        } = user;
        const partner = partnerName || 'your partner';

        if (anniversaryDate && phone) {
          const { dateDayOfYear, dateString, yearOfDate } = formatDate(
            anniversaryDate
          );
          const years = currentYear - yearOfDate;
          const daysToAnniversary = dateDayOfYear - nowDayOfYear;

          if (daysToAnniversary == 0) {
            self.sendText(
              `It's your and ${partner}'s ${fn.ordinalNumberGenerator(
                years
              )} anniversary today! Make it special!`,
              phone
            );
          }

          anniversaryReminders.forEach(rem => {
            const reminderDays = reminderObj[rem];

            if (
              daysToAnniversary == reminderDays ||
              daysToAnniversary == reminderDays - numberOfDaysInYear
            ) {
              self.sendText(
                `Don't forget your and ${partnerName}'s ${fn.ordinalNumberGenerator(
                  years
                )} anniversary on ${dateString}! Only ${rem} to go!`,
                phone
              );
            }
          });
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
        const { birthDate, birthdayReminders, partnerName, phone } = user;
        const partner = partnerName || 'your partner';

        if (birthDate && phone) {
          const { dateDayOfYear, dateString, yearOfDate } = formatDate(
            birthDate
          );
          const age = currentYear - yearOfDate;
          const daysToBirthday = dateDayOfYear - nowDayOfYear;

          if (daysToBirthday == 0) {
            self.sendText(
              `It's ${partner}'s ${fn.ordinalNumberGenerator(
                age
              )} birthday today! Make it special!`,
              phone
            );
          }

          birthdayReminders.forEach(rem => {
            const reminderDays = reminderObj[rem];

            if (
              daysToBirthday == reminderDays ||
              daysToBirthday == reminderDays - numberOfDaysInYear
            ) {
              self.sendText(
                `Don't forget ${partner}'s ${fn.ordinalNumberGenerator(
                  age
                )} birthday on ${dateString}! Only ${rem} to go!`,
                phone
              );
            }
          });
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
