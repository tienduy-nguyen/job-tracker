const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
  },
  title: {
    type: String,
    required: true,
  },
  contract_type: {
    type: String,
  },
  description: {
    type: String,
    require: true,
  },
  level_exp: {
    type: String,
  },
  salary: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  job_date: {
    type: Date,
    default: Date.now,
  },
  more_info: {
    type: String,
  },
  link_job: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('job', JobSchema);
