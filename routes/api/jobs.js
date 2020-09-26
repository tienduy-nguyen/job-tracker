const express = require('express');
const companiesRouter = express.Router();
const jobsRouter = express.Router({ mergeParams: true });
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const Company = require('../../models/Company');
const Job = require('../../models/Job');
const User = require('../../models/User');

companiesRouter.use('/:slug/jobs', jobsRouter);

// Nester router
// https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router

//@ POST api/companies/:id/jobs
// @desc     Create a post
// @access   Private
jobsRouter.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('linkJob', 'Link Job is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const company = await Company.findOne({ slug: req.params.slug });
      const user = await User.findById(req.user.id);
      const {
        title,
        contractType,
        description,
        levelExp,
        salary,
        address,
        jobDate,
        moreInfo,
        linkJob,
        isShared,
      } = req.body;
      const newJob = new Job({
        title,
        contractType,
        description,
        levelExp,
        salary,
        address,
        jobDate,
        moreInfo,
        linkJob,
        isShared,
        company,
        created_by: user,
      });
      const job = await newJob.save();
      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route GET /companies/:slug/jobs
// @desc GET all jobs of companies
// @access Private
jobsRouter.get('/', auth, async (req, res) => {
  try {
    const company = await Company.findOne({ slug: req.params.slug });
    const jobs = await Job.find({ company });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server');
  }
});

// @route GET /companies/:slug/jobs/:id
// @desc GET job by id
// @access Private
jobsRouter.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route PUT /companies/:slug/jobs/:id
// @desc Update job by id
// @access Private
jobsRouter.put(
  '/:id',
  [
    auth,
    checkObjectId('id'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('linkJob', 'Link Job is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      contractType,
      description,
      levelExp,
      salary,
      address,
      jobDate,
      moreInfo,
      linkJob,
      isShared,
    } = req.body;
    const jobField = {
      title,
      contractType,
      description,
      levelExp,
      salary,
      address,
      jobDate,
      moreInfo,
      linkJob,
      isShared,
    };
    try {
      let jobFound = await Job.findById(req.params.id);
      if (!jobFound) {
        return res.status(404).json({ msg: 'Job not found' });
      }
      const user = await User.findById(req.user.id);
      //Check permission
      if (jobFound.created_by.toString() !== req.user.id && !user.isAdmin) {
        return res.status(400).json({ msg: 'User not authorized' });
      }
      const job = await Job.findOneAndUpdate(
        { _id: req.params.id },
        { $set: jobField },
        { new: true, upsert: false, setDefaultsOnInsert: true }
      );
      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error!');
    }
  }
);

// @route DELETE /companies/:slug/jobs/:id
// @desc Delete job by id
// @access Private
jobsRouter.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    const user = await User.findById(req.user.id);
    //Check permission
    if (job.created_by.toString() !== req.user.id && !user.isAdmin) {
      return res.status(400).json({ msg: 'User not authorized' });
    }
    await job.remove();
    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error!');
  }
});

module.exports = companiesRouter;
