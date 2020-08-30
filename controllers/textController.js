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

const getNowData = () => {
  const now = DateTime.utc();
  console.log('now:', now.toISO());
  const currentYear = now.toFormat('yyyy');
  const nowDayOfYear = now.toFormat('o');
  const numberOfDaysInYear = DateTime.fromISO(`${currentYear}-12-31`).toFormat(
    'o'
  );

  return { currentYear, nowDayOfYear, numberOfDaysInYear };
};

const formatDate = date => {
  const dt = DateTime.fromJSDate(date).setZone('UTC');
  const { currentYear } = getNowData();
  const dateObj = {};

  dateObj.dateDayOfYear = dt.set({ year: currentYear }).toFormat('o');
  dateObj.dateString = dt.toFormat('MMMM d');
  dateObj.yearOfDate = dt.toFormat('yyyy');

  return dateObj;
};

const reminderObj = {
  '1 Week': 7,
  '2 Weeks': 14,
  '30 Days': 30,
  '60 Days': 60,
  '90 Days': 90
};

const self = (module.exports = {
  activate: (req, res) => {
    const nudge = req.body.nudge;
    const {
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
  runActivatedNudges: () => {
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
              .then(user => {
                fn.createTextCronJob(textMessage, user);
                self.setFutureTimestamp(nudge);
              })
              .catch(err => console.log('Error: ', err.message));
          }
        }
      });
    });
  },
  runAnniversaryNudges: () => {
    return db.User.find({}, (err, users) => {
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
          const {
            currentYear,
            nowDayOfYear,
            numberOfDaysInYear
          } = getNowData();
          const years = currentYear - yearOfDate;
          const daysToAnniversary = dateDayOfYear - nowDayOfYear;

          if (daysToAnniversary == 0) {
            const textBody = `It's your and ${partner}'s ${fn.ordinalNumberGenerator(
              years
            )} anniversary today! Make it special!`;

            fn.createTextCronJob(textBody, user);
          }

          anniversaryReminders.forEach(rem => {
            const reminderDays = reminderObj[rem];

            if (
              daysToAnniversary == reminderDays ||
              daysToAnniversary == reminderDays - numberOfDaysInYear
            ) {
              const textBody = `Don't forget your and ${partnerName}'s ${fn.ordinalNumberGenerator(
                years
              )} anniversary on ${dateString}! Only ${rem} to go!`;

              fn.createTextCronJob(textBody, user);
            }
          });
        }
      });
    });
  },
  runBirthdayNudges: () => {
    return db.User.find({}, (err, users) => {
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
          const {
            currentYear,
            nowDayOfYear,
            numberOfDaysInYear
          } = getNowData();
          const age = currentYear - yearOfDate;
          const daysToBirthday = dateDayOfYear - nowDayOfYear;

          if (daysToBirthday == 0) {
            const textBody = `It's ${partner}'s ${fn.ordinalNumberGenerator(
              age
            )} birthday today! Make it special!`;

            fn.createTextCronJob(textBody, user);
          }

          birthdayReminders.forEach(rem => {
            const reminderDays = reminderObj[rem];

            if (
              daysToBirthday == reminderDays ||
              daysToBirthday == reminderDays - numberOfDaysInYear
            ) {
              const textBody = `Don't forget ${partner}'s ${fn.ordinalNumberGenerator(
                age
              )} birthday on ${dateString}! Only ${rem} to go!`;

              fn.createTextCronJob(textBody, user);
            }
          });
        }
      });
    });
  },
  runCustomDateNudges: () => {
    return db.User.find({})
      .populate('customDates')
      .then(users => {
        users.forEach(user => {
          const { customDates, phone } = user;

          if (customDates.length && phone) {
            customDates.forEach(date => {
              const { title, description, value, reminders } = date;
              const { dateDayOfYear, dateString } = formatDate(value);
              const { nowDayOfYear, numberOfDaysInYear } = getNowData();
              const daysToDate = dateDayOfYear - nowDayOfYear;

              if (daysToDate == 0) {
                const textBody = `It's the ${title} (${description}) today!`;

                fn.createTextCronJob(textBody, user);
              }

              reminders.forEach(rem => {
                const reminderDays = reminderObj[rem];

                if (
                  daysToDate == reminderDays ||
                  daysToDate == reminderDays - numberOfDaysInYear
                ) {
                  const textBody = `Don't forget the ${title} (${description}) on ${dateString}! Only ${rem} to go!`;

                  fn.createTextCronJob(textBody, user);
                }
              });
            });
          }
        });
      })
      .catch(err => console.log({ error: err.message }));
  },
  sendText: (body, to) => {
    client.messages
      .create({
        body: `${body}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+1${to}`
      })
      .then(message => {
        const data = {
          date: DateTime.local().toLocaleString(DateTime.DATETIME_FULL),
          body: body,
          to: message.to,
          sid: message.sid
        };
        fn.logText(data);
      })
      .catch(err => console.log('err:', err));
  },
  setFutureTimestamp: nudge => {
    const futureTimestamp = fn.getFutureTimestamp(nudge);

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
  toggle: (req, res) => {
    db.Nudge.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err.message));
  },
  send: (req, res) => {
    const { phone, textMessage } = req.body;

    client.messages
      .create({
        body: `${textMessage}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+1${phone}`
      })
      .then(message => {
        const data = {
          date: DateTime.local().toLocaleString(DateTime.DATETIME_FULL),
          body: textMessage,
          to: message.to,
          sid: message.sid
        };
        fn.logText(data);
        res.json({ msg: 'Test Text Successfully Sent' });
      })
      .catch(err => console.log('err:', err));
  }
});
