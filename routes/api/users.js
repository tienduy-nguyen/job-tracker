const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usersController = require('../../controllers/users');

// @route GET api/user
// @desc Register user
// @access Public
router.post(
  '/',

  //Using express-validator to check form input
  [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  usersController.createUser
);

module.exports = router;
