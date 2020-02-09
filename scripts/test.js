const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const db = require('../models');
const textController = require('../controllers/textController');

const now = DateTime.utc();
const nowDayOfYear = now.toFormat('o');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pp', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

console.log(`
now.ts: ${now.ts}
now.loc.locale: ${now.loc.locale}
now.loc.intl: ${now.loc.intl}
now.o: ${now.o}`);
console.log('now.c:', now.c);
console.log('nowDayOfYear:', nowDayOfYear);

const runMethods = async () => {
  await textController.runAnniversaryNudges();
  await textController.runBirthdayNudges();

  process.exit(0);
};

runMethods();
