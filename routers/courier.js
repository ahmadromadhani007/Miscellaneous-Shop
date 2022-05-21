const express = require('express');
const router = express.Router();

router.use(require('../controllers/courier'));
    
module.exports = router;