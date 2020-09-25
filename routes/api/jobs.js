const express = require('express');
const companiesRouter = express.Router();
const jobsRouter = express.Router({ mergeParams: true });
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const Company = require('../../models/Company');
const Job = require('../../models/Job');

companiesRouter.use('/:companySlug/jobs', jobsRouter);

// Nester router
// https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router

//@ POST api/companies/:id/jobs
//@ POST api/companies/:id/jobs
//@ POST api/companies/:id/jobs
//@ POST api/companies/:id/jobs
jobsRouter.post(
  '/',
  [
    auth,
    checkObjectId,
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
      const company = await Copany;
    } catch (err) {
      console.error(err.mesaage);
      res.status(500).send('Server error');
    }
  }
);

module.exports = companiesRouter;
