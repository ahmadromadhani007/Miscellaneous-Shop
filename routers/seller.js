const express = require('express');
const router = express.Router();

router.use(require('../controllers/LogSellers/seller'));

module.exports = router;