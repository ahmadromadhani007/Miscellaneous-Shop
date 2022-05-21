const express = require('express');
const router = express.Router();

router.use(require('../controllers/country'));
    
module.exports = router;