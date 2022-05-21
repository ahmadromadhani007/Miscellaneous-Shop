const express = require('express');
const router = express.Router();

router.use(require('../controllers/transaction_details'));
    
module.exports = router;