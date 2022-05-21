const express = require('express');
const router = express.Router();

router.use(require('../controllers/product'));

module.exports = router;