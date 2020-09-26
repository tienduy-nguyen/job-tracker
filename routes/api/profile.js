const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const gravatar = require('gravatar');

const User = require('../../models/User');
const UserJob = require('../../models/UserJob');
const Profile = require('../../models/Profile');
const { request } = require('express');

// @route GET api/profile/me
// @desc Get current user profile
// @access private

router.get('/:username', auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: request.params.username });
    if (!user) {
      return res
        .status(400)
        .json({ msg: `${req.params.username} does not exist!` });
    }
    const profile = await Profile.findOne({
      user: user.id,
    }).populate('user');
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is not profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route POST api/profile
// @desc Create or update profile
// @access private
router.post(
  '/',
  [
    auth,
    [
      check('firstName', 'First name is required').not().isEmpty(),
      check('lastName', 'Last Name is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, title, bio } = req.body;

    try {
      const user = await User.findById(req.user.id);
      const avatar = gravatar.url(user.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      const profileFields = {
        firstName,
        lastName,
        title,
        bio,
        avatar,
      };
      const profile = Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE profile/:username
// @desc     Delete profile
// @access   Private

router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await UserJob.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
