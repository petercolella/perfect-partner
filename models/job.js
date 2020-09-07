const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  args: Array,
  date: Date
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
