const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  const phone = req.body.phone;
  console.log(phone);

  const mail = {
    from: '"Perfect Partner" <perfect@anthonylindo.com>',
    to: `${phone}@textmagic.com`,
    subject: 'Hello ✔',
    text: 'Tell her you love her.'
  };

  const transporter = nodemailer.createTransport({
    host: 'mail.anthonylindo.com',
    port: 465,
    secure: true,
    auth: {
      user: 'perfect@anthonylindo.com',
      pass: 'Trigoph_9'
    }
  });

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'Fail'
      });
      return console.log(err);
    } else {
      console.log('Message sent: %s', data.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(data));
      res.json({
        msg: 'Success'
      });
    }
  });
});

module.exports = router;
