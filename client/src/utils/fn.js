export default {
  formatPhoneNumber: function(num) {
    const first3 = num.slice(0, 3);
    const second3 = num.slice(3, 6);
    const last4 = num.slice(6);

    return `(${first3}) ${second3}-${last4}`;
  }
};
