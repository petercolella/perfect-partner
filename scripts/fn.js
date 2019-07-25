module.exports = {
  frequencyToMilliseconds: function(nudgeFrequency, nudgeFrequencyUnit) {
    switch (nudgeFrequencyUnit) {
      case 'seconds':
        return nudgeFrequency * 1000;
        break;
      case 'minutes':
        return nudgeFrequency * 60 * 1000;
        break;
      case 'hours':
        return nudgeFrequency * 3600 * 1000;
        break;
      case 'days':
        return nudgeFrequency * 86400 * 1000;
        break;
      case 'weeks':
        return nudgeFrequency * 604800 * 1000;
        break;
      case 'months':
        return nudgeFrequency * 2419200 * 1000;
        break;
      case 'years':
        return nudgeFrequency * 31449600 * 1000;
        break;
      default:
        return nudgeFrequency * 60480 * 1000;
    }
  }
};
