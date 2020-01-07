require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const http = require('http');
const { DateTime } = require('luxon');
const CronJob = require('cron').CronJob;

const app = express();
const PORT = process.env.PORT || 3001;
const textController = require('./controllers/textController');

// Prevents Heroku from idling.
setInterval(function() {
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
        console.log(`Received ${chunk.length} bytes of data.`);
      });
      res.on('end', () => {
        try {
          console.log(DateTime.local().toLocaleString(DateTime.DATETIME_FULL));
          console.log('Done.');
        } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on('error', e => {
      console.error(`Got error: ${e.message}`);
    });
}, 300000);

const job = new CronJob(
  '0 0 8 * * *',
  function() {
    const d = new Date();
    console.log('run job:', d);
    textController.runActivatedNudges();
    textController.runBirthdayNudges();
  },
  null,
  false,
  'America/New_York'
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pp', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  job.start();
});
