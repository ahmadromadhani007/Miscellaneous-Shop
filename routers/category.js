const express = require('express');
const router = express.Router();

router.use(require('../controllers/category'));
    
module.exports = router;