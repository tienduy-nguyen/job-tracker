const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult, check } = require('express-validator');
const gravatar = require('gravatar');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');
const Job = require('../models/Job');

// POST Register user
exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    //See if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      username,
      email,
      password,
    });
    //Encrypty password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };
    const jwtSecret = process.env.jwtSecret;
    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route GET api/users/jobs
exports.getAllAppliedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.appliedJobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route    PUT api/users/jobs/:jobId
exports.addAppliedJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(400).json({ msg: 'Job does not exist' });
    }
    const user = await User.findById(req.user.id);
    let appliedJobs = user.appliedJobs;

    const checkAppliedJob = appliedJobs.find(
      (x) => x.job.toString() === job.id.toString()
    );

    // Check if job added or not
    if (checkAppliedJob) {
      return res.status(400).json({ msg: 'Job has been already added' });
    }
    appliedJobs.unshift({ job });
    await user.updateOne({ appliedJobs });
    res.json(user.appliedJobs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

// @route    PUT api/users/jobs/:id/edit
exports.editAppliedJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const {
    employer,
    interview1,
    interview2,
    interview3,
    interview4,
    notice,
  } = req.body;
  const failed = req.body.failed || false;
  const ignored = req.body.ignored || false;

  try {
    const user = await User.findById(req.user.id);
    const appliedJob = user.appliedJobs.find(
      (x) => x.id.toString() === req.params.id
    );
    if (!appliedJob) {
      return res.status(400).json({ msg: 'Applied job does not exist' });
    }

    const query = { _id: req.user.id };
    const update = {
      $set: {
        'appliedJobs.$[item].notice': notice,
        'appliedJobs.$[item].employer': employer,
        'appliedJobs.$[item].failed': failed,
        'appliedJobs.$[item].ignored': ignored,
        'appliedJobs.$[item].interview1': interview1,
        'appliedJobs.$[item].interview2': interview2,
        'appliedJobs.$[item].interview3': interview3,
        'appliedJobs.$[item].interview4': interview4,
      },
    };
    const options = {
      new: true,
      arrayFilters: [
        { 'item._id': new mongoose.Types.ObjectId(appliedJob.id) },
      ],
    };
    const updatedUser = await User.findOneAndUpdate(query, update, options);

    res.json(updatedUser.appliedJobs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};

// @route    DELETE api/users/jobs/:id
exports.deleteAppliedJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const jobs = user.appliedJobs.filter(
      (x) => x.id.toString() !== req.params.id
    );
    const updatedUser = await user.update(jobs);
    res.json(updatedUser.appliedJobs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
};
