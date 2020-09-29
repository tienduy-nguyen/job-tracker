const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Company = require('../../models/Company');
const checkObjectId = require('../../middleware/checkObjectId');
const companiesController = require('../../controllers/companies');

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
  companiesController.createCompany
);

// @route    GET api/companies
// @desc     Get all companies
// @access   Private
router.get('/', auth, companiesController.getCompanies);

// @route    GET api/companies/:slug
// @desc     Get company by ID
// @access   Private
router.get('/:slug', auth, companiesController.getCompaniesByName);

// @route    DELETE api/companies/:id
// @desc     Delete company
// @access   Private
router.delete(
  '/:id',
  [auth, checkObjectId('id')],
  companiesController.deleteCompany
);

module.exports = router;
