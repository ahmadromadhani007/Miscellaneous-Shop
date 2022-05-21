const express = require('express');
const router = express.Router();

router.use(require('../controllers/LogUsers/users'));

module.exports = router;