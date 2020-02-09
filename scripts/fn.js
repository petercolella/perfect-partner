require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

module.exports = {
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
  ordinalNumberGenerator: num => {
    const ordinalIndicatorArray = ['th', 'st', 'nd', 'rd'];
    let lastDigit = num % 10;
    if (lastDigit > 3) lastDigit = 0;
    return num + ordinalIndicatorArray[lastDigit];
  },
  verify: token_id => {
    return client.verifyIdToken({
      idToken: token_id,
      audience: CLIENT_ID
    });
  }
};
