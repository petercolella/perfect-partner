require('dotenv').config();
const { DateTime } = require('luxon');
const CronJob = require('cron').CronJob;

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);

const fs = require('fs');

const self = (module.exports = {
  createTextCronJob: (body, user) => {
    const { offset, phone, timeZone } = user;
    const sendTextHour = 8;

    let date = new Date();
    date.setHours(0, 0, 0, 0);
    console.log('date:', date);

    const newHour = date.getHours() + sendTextHour - offset / 60;
    const localTimeZone = new Date(date.setHours(newHour));
    console.log('localTimeZone:', localTimeZone);

    const diff = localTimeZone - new Date();
    console.log('diff:', diff);

    if (diff > 0) {
      const job = new CronJob(
        localTimeZone,
        () => {
          const d = new Date();
          console.log('run job:', d);
          self.sendText(body, phone);
        },
        null,
        true,
        timeZone
      );
      console.log(
        `Next job for user ${user.name} (${
          user._id
        }): ${job.nextDate().toString()}`
      );
    } else {
      console.log(new Error('WARNING: Date in past. Will never be fired.'));
    }
  },
  getFutureTimestamp: nudge => {
    const { nudgeFrequency, nudgeFrequencyUnit } = nudge;
    let milliseconds;

    switch (nudgeFrequencyUnit) {
      case 'seconds':
        milliseconds = nudgeFrequency * 1000;
        break;
      case 'minutes':
        milliseconds = nudgeFrequency * 60 * 1000;
        break;
      case 'hours':
        milliseconds = nudgeFrequency * 3600 * 1000;
        break;
      case 'days':
        milliseconds = nudgeFrequency * 86400 * 1000;
        break;
      case 'weeks':
        milliseconds = nudgeFrequency * 604800 * 1000;
        break;
      case 'months':
        milliseconds = nudgeFrequency * 2419200 * 1000;
        break;
      case 'years':
        milliseconds = nudgeFrequency * 31449600 * 1000;
        break;
      default:
        milliseconds = nudgeFrequency * 60480 * 1000;
    }
    const randomFrequency = Math.floor(Math.random() * nudgeFrequency) + 1;
    const randomMilliseconds =
      (milliseconds * randomFrequency) / nudgeFrequency;
    const futureTimestamp = Date.now() + randomMilliseconds;

    return futureTimestamp;
  },
  logText: data => {
    fs.appendFile(
      __dirname + '/../logs/log.txt',
      JSON.stringify(data, null, 2) + '\n',
      err => {
        if (err) {
          return console.log(err);
        }

        console.log(data);
      }
    );
  },
  ordinalNumberGenerator: num => {
    const ordinalIndicatorArray = ['th', 'st', 'nd', 'rd'];
    let lastDigit = num % 10;
    if (lastDigit > 3) lastDigit = 0;
    return num + ordinalIndicatorArray[lastDigit];
  },
  sendText: (body, to, res) => {
    twilioClient.messages
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
        self.logText(data);
        if (res) res.json({ msg: 'Test Text Successfully Sent' });
      })
      .catch(err => console.log('err:', err));
  },
  verify: token_id => {
    return client.verifyIdToken({
      idToken: token_id,
      audience: CLIENT_ID
    });
  }
});
