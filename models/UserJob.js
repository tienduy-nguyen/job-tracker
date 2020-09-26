const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserJobSchema = new Schema(
  {
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
    interview1: {
      type: Date.now,
      default: Date.now,
    },
    interview2: {
      type: Date.now,
      default: Date.now,
    },
    interview3: {
      type: Date.now,
      default: Date.now,
    },
    interview4: {
      type: Date.now,
      default: Date.now,
    },
    personalNotice: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('userJob', UserJobSchema);
