const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  website: {
    type: String,
  },
  employees: {
    type: Number,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    require: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  jobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'job',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('company', CompanySchema);
