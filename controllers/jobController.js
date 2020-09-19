const db = require('../models');
const fn = require('../scripts/fn');
const CronJob = require('cron').CronJob;

module.exports = {
  findAllTextCronJobs: () => {
    db.Job.find()
      .then(models => {
        models.forEach(model => {
          const d = new Date();
          const { args, date } = model;
          const [body, phone] = args;
          if (d < date) {
            new CronJob(
              date,
              () => {
                fn.sendText(body, phone);
              },
              null,
              true
            );
          } else {
            db.Job.findByIdAndDelete(model._id)
              .then(deletedModel => {
                console.log(deletedModel);
              })
              .catch(err => console.log(err));
          }
        });
      })
      .catch(err => console.log(err));
  }
};
