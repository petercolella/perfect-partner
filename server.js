const { DateTime } = require('luxon');
const CronJob = require('cron').CronJob;
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const routes = require('./routes');
const jobController = require('./controllers/jobController');
const textController = require('./controllers/textController');

const app = express();
const PORT = process.env.PORT || 3001;

// Prevents Heroku from idling.
setInterval(() => {
  http
    .get('http://perfectpartner.herokuapp.com/', res => {
      const { statusCode } = res;

      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
      }
      if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
      }
      res.on('data', chunk => {
        console.log(
          `Received ${
            chunk.length
          } bytes of data. ${DateTime.local().toLocaleString(
            DateTime.DATETIME_FULL
          )}`
        );
      });
      res.on('end', () => {
        try {
          console.log('Done?', res.complete);
        } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on('error', e => {
      console.error(`Got error: ${e.message}`);
    });
}, 300000);

const job = new CronJob('0 0 0 * * *', () => {
  const d = new Date();
  console.log('run job:', d);
  textController.runActivatedNudges();
  textController.runAnniversaryNudges();
  textController.runBirthdayNudges();
  textController.runCustomDateNudges();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pp', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  job.start();
  jobController.findAllTextCronJobs();
});
