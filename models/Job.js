const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
  },
  userJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'userJob',
    },
  ],
  title: {
    type: String,
    required: true,
  },
  contractType: {
    type: String,
  },
  description: {
    type: String,
    require: true,
  },
  levelExp: {
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
  jobDate: {
    type: Date,
    default: Date.now,
  },
  moreInfo: {
    type: String,
  },
  linkJob: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('job', JobSchema);
