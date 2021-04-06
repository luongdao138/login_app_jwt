const express = require('express');
const router = express.Router();

//controller
const { login, register } = require('../controllers/Auth');

// middlewares
const {
  validate,
  validateLogin,
  checkExistLogin,
  checkExist,
} = require('../middlewares/auth');

router.post('/register', validate, checkExist, register);

router.post('/login', validateLogin, checkExistLogin, login);
module.exports = router;
