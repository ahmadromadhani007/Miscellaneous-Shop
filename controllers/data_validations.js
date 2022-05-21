const {check} = require('express-validator');

module.exports.data = [
    check ('id_shop').not().isEmpty().withMessage('id_shop harus ada data yang valid'),
    check ('id_brands').not().isEmpty().withMessage('id_brands harus ada data yang valid'),
    check ('id_category').not().isEmpty().withMessage('id_category harus ada data yang valid'),
    check ('name').not().isEmpty().withMessage('name harus ada data yang valid'),
    check ('description').not().isEmpty().withMessage('description harus ada data yang valid')
]