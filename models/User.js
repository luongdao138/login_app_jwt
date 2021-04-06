const mongoose = require('mongoose');
const { Schema } = mongoose;

// create user schema
const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    min: 6,
  },
  email: { type: String, require: true },
  password: { type: String, require: true, min: 6, max: 50 },
  date_of_birth: Date,
  address: String,
  register_date: { type: Date, default: Date.now },
});

// creat the user model
const User = mongoose.model('User', userSchema);

// export user model
module.exports = User;
