const express = require('express');
const router = express.Router();

router.use(require('../controllers/transaction'));
    
module.exports = router;