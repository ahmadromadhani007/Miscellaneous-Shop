const express = require('express');
const router = express.Router();

router.use(require('../controllers/brands'));
    
module.exports = router;