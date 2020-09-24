const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Company = require('../../models/Company');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/companies
// @desc     Create or update a company
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('address', 'Address is required!').not().isEmpty(),
      check('description', 'Description is required!').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      website,
      employees,
      description,
      address,
      createdDate,
    } = req.body;
    try {
      let com = await Company.findOne({ name });
      if (com) {
        return res
          .status(400)
          .json({ errors: { msg: 'Company already exists' } });
      }
      const newCompany = new Company({
        name,
        website,
        employees,
        description,
        address,
        createdDate,
      });
      const company = await newCompany.save();
      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/companies
// @desc     Get all companies
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const companies = await Company.find().sort({ date: -1 });
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/companies/:id
// @desc     Get company by ID
// @access   Private
router.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const company = await (await Company.findById(req.params.id)).populate(
      'jobs'
    );
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
