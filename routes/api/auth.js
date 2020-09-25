const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const authController = require('../../controllers/auth');

//@route  GET api/auth
//@desc   Get Auth User
//Access  Public
router.get('/', auth, authController.getUser);

//@route  POST api/auth
//@desc   Auth Login
//Access  Public
router.post(
  '/',
  [
    check('email', 'Please a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.loginUser
);

module.exports = router;
