const mongoose = require('mongoose');

// Middleware to check for a valid object id
const checkObjectid = (id) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[id]))
    return res.status(400).json({ msg: 'Invalid ID' });
  next();
};
