const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    notices: [
      {
        type: Schema.Types.ObjectId,
        ref: 'notice',
      },
    ],
    userJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'userJob',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
