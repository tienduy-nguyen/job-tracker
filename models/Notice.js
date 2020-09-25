const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticeSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('notice', NoticeSchema);
