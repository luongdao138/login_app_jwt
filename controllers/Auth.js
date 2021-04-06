const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    let newUser = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashPw = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashPw;

    newUser = await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: 'interal server error!' });
  }
};

const login = (req, res) => {
  const { email, _id } = req.body;

  // create a token
  jwt.sign(
    { _id, email },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: '1h' },
    (err, token) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, msg: 'interal server error' });
      } else {
        // set the token in the header
        res.set('Auth-token', token);

        return res.status(200).json({ success: true, token });
      }
    }
  );
};

module.exports = { login, register };
