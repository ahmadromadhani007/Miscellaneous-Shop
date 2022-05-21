const express = require('express');
const router = express.Router();

router.use(require('../controllers/discount'));
    
module.exports = router;