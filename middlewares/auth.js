const { registerValidation, loginValidation } = require('../validation');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const validate = (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      msg: error.details[0].message,
    });
  } else {
    next();
  }
};

const validateLogin = (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      msg: error.details[0].message,
    });
  } else {
    next();
  }
};

const checkExist = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      next();
    } else {
      return res
        .status(400)
        .json({ success: false, msg: 'Email already exists!' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: 'internal server error!' });
  }
};

const checkExistLogin = async (req, res, next) => {
  try {
    //check email
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isPwValid = await bcrypt.compare(req.body.password, user.password);

      // check password
      if (isPwValid) {
        req.body._id = user._id;
        next();
      } else {
        return res
          .status(400)
          .json({ success: false, msg: 'Password does not correct!' });
      }
    } else {
      return res.status(400).json({ success: false, msg: 'Email not exists!' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: 'internal server error!' });
  }
};

module.exports = { validate, validateLogin, checkExistLogin, checkExist };
