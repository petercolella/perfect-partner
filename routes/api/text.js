require('dotenv').config();
const router = require('express').Router();
const nodemailer = require('nodemailer');

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// const phone = '4047841090';
// const textMessage = 'Testing 123!!!';
// console.log(phone);

// client.messages
//   .create({
//     body: `${textMessage}`,
//     from: `+14782204252`,
//     to: `+1${phone}`
//   })
//   .then(message => {
//     console.log(message.sid);
//     res.json({ msg: 'Success' });
//   });

router.post('/', (req, res) => {
  const phone = req.body.phone;
  const textMessage = req.body.textMessage;
  console.log('req.body:', req.body);
  console.log('textMessage:', textMessage);
  console.log('phone:', phone);
  console.log('accountSid:', accountSid);
  console.log('authToken:', authToken);
  console.log('client:', client);

  client.messages
    .create({
      body: `Testing 123!!!`,
      from: `+14782204252`,
      to: `+1${phone}`
    })
    .then(message => {
      console.log(message.sid);
      res.json({ msg: 'Success' });
    });

  //   const mail = {
  //     from: '"Perfect Partner" <perfect@anthonylindo.com>',
  //     to: `${phone}@textmagic.com`,
  //     subject: 'Hello ✔',
  //     text: `${textMessage}`
  //   };

  //   const transporter = nodemailer.createTransport({
  //     host: 'mail.anthonylindo.com',
  //     port: 465,
  //     secure: true,
  //     auth: {
  //       user: 'perfect@anthonylindo.com',
  //       pass: 'Trigoph_9'
  //     }
  //   });

  //   transporter.sendMail(mail, (err, data) => {
  //     if (err) {
  //       res.json({
  //         msg: 'Fail'
  //       });
  //       return console.log(err);
  //     } else {
  //       console.log('Message sent: %s', data.messageId);
  //       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(data));
  //       res.json({
  //         msg: 'Success'
  //       });
  //     }
  //   });
});

module.exports = router;
