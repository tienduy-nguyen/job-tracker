const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
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
    avatar: {
      type: String,
    },
    title: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

ProfileSchema.pre('save', function (next) {
  this.fullName = capitalize(this.firstName) + ' ' + capitalize(this.lastName);
});

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = mongoose.model('profile', ProfileSchema);
