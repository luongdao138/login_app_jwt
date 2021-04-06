const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const authorization = req.header('Authorization');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, msg: 'Unauthorized!' });
  }
  const token = authorization.replace('Bearer ', '');

  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.user_id = verified._id;
  } catch (error) {
    return res.status(400).json({ success: false, msg: 'token invalid!' });
  }
  next();
};

module.exports = { verifyToken };
