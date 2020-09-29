const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usersController = require('../../controllers/users');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

// @route GET api/user
// @desc Register user
// @access Public
router.post(
  '/',

  //Using express-validator to check form input
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  usersController.createUser
);

// @route    PUT api/users/jobs/:jobId
// @desc     Add user applied jobs
// @access   Private
router.get('/jobs', auth, usersController.getAllAppliedJobs);

// @route    PUT api/users/jobs/:jobId
// @desc     Add user applied jobs
// @access   Private
router.put(
  '/jobs/:jobId',
  [auth, checkObjectId('jobId')],
  usersController.addAppliedJob
);

// @route    PUT api/users/jobs/:jobId/edit
// @desc     Update applied jobs
// @access   Private
router.put(
  '/jobs/:id/edit',
  [auth, checkObjectId('id')],
  usersController.editAppliedJob
);

// @route    PUT api/users/jobs/:jobId/edit
// @desc     Update applied jobs
// @access   Private
router.delete(
  '/jobs/:id',
  [auth, checkObjectId('id')],
  usersController.deleteAppliedJob
);

module.exports = router;
