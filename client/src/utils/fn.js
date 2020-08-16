export default {
  capitalizeFirstLetter: str => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  },
  formatPhoneNumber: num => {
    if (num.length) {
      let chars = '';
      for (let i = 0; i < 10; i++) {
        if (!num[i]) {
          chars += '\u005F';
        } else {
          chars += num[i];
        }
      }
      const first3 = chars.substring(0, 3).split('').join('\u200A');
      const second3 = chars.substring(3, 6).split('').join('\u200A');
      const last4 = chars.substring(6).split('').join('\u200A');

      return `(${first3}) ${second3} - ${last4}`;
    }

    return num;
  },
  localToUTC: date => {
    const newDate = date.setZone('UTC').set({ hour: 0 });
    return newDate;
  },
  UTCToLocal: date => {
    const newHour = date.hour - date.offset / 60;
    const newDate = date.set({ hour: newHour });
    return newDate;
  }
};
