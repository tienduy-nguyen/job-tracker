const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserJobSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'job',
  },
  employer: {
    type: String,
  },
  failed: {
    type: Boolean,
    default: false,
  },
  ignored: {
    type: Boolean,
    default: false,
  },
  interview_1: {
    type: Date.now,
    default: Date.now,
  },
  interview_2: {
    type: Date.now,
    default: Date.now,
  },
  interview_3: {
    type: Date.now,
    default: Date.now,
  },
  interview_4: {
    type: Date.now,
    default: Date.now,
  },
  notice: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user_job', UserJobSchema);
