const express = require('express');
const router = express.Router();

router.use(require('../controllers/file_seller'));
    
module.exports = router;