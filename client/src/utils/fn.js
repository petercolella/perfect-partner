export default {
  capitalizeFirstLetter: function(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  },
  formatPhoneNumber: function(num) {
    const first3 = num.slice(0, 3);
    const second3 = num.slice(3, 6);
    const last4 = num.slice(6);

    return `(${first3}) ${second3}-${last4}`;
  },
  localToUTC: function(date) {
    const newDate = date.setZone('UTC').set({ hour: 0 });
    return newDate;
  },
  UTCToLocal: function(date) {
    const newHour = date.hour - date.offset / 60;
    const newDate = date.set({ hour: newHour });
    return newDate;
  }
};
