const express = require('express');
const router = express.Router();

router.use(require('../controllers/promo'));
    
module.exports = router;