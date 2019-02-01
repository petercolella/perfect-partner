const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  const phone = req.body.phone;
  console.log(phone);

  const mail = {
    from: '"Perfect Partner" <perfect_partner1@outlook.com>',
    to: `${phone}@textmagic.com`,
    subject: 'Hello ✔',
    text: 'Tell her you love her.'
  };

  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: 'perfect_partner1@outlook.com',
      pass: 'b00tc@mp123'
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
