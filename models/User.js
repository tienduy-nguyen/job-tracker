const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    appliedJobs: [
      {
        job: {
          type: Schema.Types.ObjectId,
          ref: 'job',
        },
        employer: [{ name: String, description: String }],
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
        notice: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.path('email').validate(function (email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email.text); // Assuming email has a text attribute
}, 'The e-mail field cannot be empty.');

UserSchema.path('username').validate(function (username) {
  var usernameRegex = /^(\s)?$/;
  return usernameRegex.test(username.text); // Assuming username has a text attribute
}, 'The e-mail field cannot be empty.');

module.exports = mongoose.model('user', UserSchema);
