const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/verifyToken');

router.use(verifyToken);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
