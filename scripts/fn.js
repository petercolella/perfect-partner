module.exports = {
  getFutureTimestamp: function(nudge) {
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
  }
};
