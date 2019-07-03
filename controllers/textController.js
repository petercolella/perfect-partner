require('dotenv').config();

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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
    const response = req.body;
    res.json(response);
  },
  activate: function(req, res) {
    console.log(req.body);
    const nudgeFrequency = req.body.nudge.nudgeFrequency;
    const nudgeFrequencyUnit = req.body.nudge.nudgeFrequencyUnit;
    const textMessage = req.body.nudge.textMessage;
    const phone = req.body.user.phone;
    const milliseconds = frequencyToMilliseconds(
      nudgeFrequency,
      nudgeFrequencyUnit
    );
    const nudgeInterval = setInterval(() => {
      sendText(textMessage, phone);
    }, milliseconds);
    res.json({ msg: 'Nudge Text Avtivated', milliseconds });
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
