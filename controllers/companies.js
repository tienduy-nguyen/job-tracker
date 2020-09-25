const { validationResult } = require('express-validator');
const Company = require('../models/Company');
const slugify = require('slugify');

exports.createCompany = async (req, res) => {
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
  const slug = slugify(name).toLowerCase();
  const companyField = {
    name,
    slug,
    website,
    employees,
    description,
    address,
    createdDate,
  };
  try {
    //Using upsert option (create new doc if no match is found)
    let company = await Company.findOneAndUpdate(
      { name: name },
      { $set: companyField },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCompaniesById = async (req, res) => {
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
};

exports.deleteCompany = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.isAdmin) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }

    await company.remove();

    res.json({ msg: 'Company removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
