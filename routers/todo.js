const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/verifyToken');

router.use(verifyToken);

router.get('/', (req, res) => {
  res.json({ _id: req.user_id });
});

module.exports = router;
