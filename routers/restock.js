const express = require('express');
const router = express.Router();

router.use(require('../controllers/restock'));
    
module.exports = router;