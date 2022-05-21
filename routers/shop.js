const express = require('express');
const router = express.Router();

router.use(require('../controllers/shop'));
    
module.exports = router;