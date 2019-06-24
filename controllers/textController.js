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

module.exports = {
  activate: function(req, res) {
    console.log(req.body);
    res.json({ msg: 'Nudge Text Avtivated' });
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
