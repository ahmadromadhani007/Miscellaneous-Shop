const express = require('express');
const router = express.Router();

router.use("/controllers",require('./country'));
router.use("/controllers",require('./category'));
router.use("/controllers",require('./brands'));
router.use("/controllers",require('./courier'));
router.use("/controllers",require('./payment'));
router.use("/controllers",require('./promo'));
router.use("/controllers",require('./discount'));
router.use("/controllers",require('./product'));
router.use("/controllers",require('./admin'));
router.use("/controllers",require('./users'));
router.use("/controllers",require('./restock'));
router.use("/controllers",require('./file_seller'));
router.use("/controllers",require('./shop'));
router.use("/controllers",require('./transaction'));
router.use("/controllers",require('./transaction_details'));
router.use("/controllers",require('./seller'));


module.exports = router;
