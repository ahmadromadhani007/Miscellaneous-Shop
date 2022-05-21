const express = require('express');
const router = express.Router();

router.use(require('../controllers/LogAdmin/admin'));

module.exports = router;