const express = require('express');
const router = express.Router();

router.use(require('../controllers/payment'));
    
module.exports = router;