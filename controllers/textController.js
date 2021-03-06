require('dotenv').config();
const db = require('../models');
const {
  createTextCronJob,
  getFutureTimestamp,
  ordinalNumberGenerator,
  sendText
} = require('../scripts/fn');
const { DateTime } = require('luxon');

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
          sendText(activateBody, phone);
          self.setFutureTimestamp(nudge);
          res.json({ msg: `${name} Activated`, activated: dbModel.activated });
        } else {
          const deactivateBody = `You have deactivated your ${name} Nudge. Text reminders will not be sent.`;

          sendText(deactivateBody, phone);
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
                createTextCronJob(textMessage, user, true);
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
            const textBody = `It's your and ${partner}'s ${ordinalNumberGenerator(
              years
            )} anniversary today! Make it special!`;

            createTextCronJob(textBody, user);
          }

          anniversaryReminders.forEach(rem => {
            const reminderDays = reminderObj[rem];

            if (
              daysToAnniversary == reminderDays ||
              daysToAnniversary == reminderDays - numberOfDaysInYear
            ) {
              const textBody = `Don't forget your and ${partnerName}'s ${ordinalNumberGenerator(
                years
              )} anniversary on ${dateString}! Only ${rem} to go!`;

              createTextCronJob(textBody, user);
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
            const textBody = `It's ${partner}'s ${ordinalNumberGenerator(
              age
            )} birthday today! Make it special!`;

            createTextCronJob(textBody, user);
          }

          birthdayReminders.forEach(rem => {
            const reminderDays = reminderObj[rem];

            if (
              daysToBirthday == reminderDays ||
              daysToBirthday == reminderDays - numberOfDaysInYear
            ) {
              const textBody = `Don't forget ${partner}'s ${ordinalNumberGenerator(
                age
              )} birthday on ${dateString}! Only ${rem} to go!`;

              createTextCronJob(textBody, user);
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

                createTextCronJob(textBody, user);
              }

              reminders.forEach(rem => {
                const reminderDays = reminderObj[rem];

                if (
                  daysToDate == reminderDays ||
                  daysToDate == reminderDays - numberOfDaysInYear
                ) {
                  const textBody = `Don't forget the ${title} (${description}) on ${dateString}! Only ${rem} to go!`;

                  createTextCronJob(textBody, user);
                }
              });
            });
          }
        });
      })
      .catch(err => console.log({ error: err.message }));
  },
  setFutureTimestamp: nudge => {
    const futureTimestamp = getFutureTimestamp(nudge);

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

    sendText(textMessage, phone, res);
  }
});
