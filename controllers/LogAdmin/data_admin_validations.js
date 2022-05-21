const {check} = require('express-validator');

module.exports.daftar = [
    check('name')
    .not().isEmpty().withMessage('name should not be empty'),
    check('id_provinsi')
    .not().isEmpty().withMessage('id_provinsi should not be empty')
    .isNumeric().withMessage('id_provinsi should be numeric'),
    check('id_kabupaten')
    .not().isEmpty().withMessage('id_kabupaten should not be empty')
    .isNumeric().withMessage('id_kabupaten should be numeric'),
    check('id_kecamatan')
    .not().isEmpty().withMessage('id_kecamatan should not be empty')
    .isNumeric().withMessage('id_kecamatan should be numeric'),
    check('id_desa')
    .not().isEmpty().withMessage('id_desa should not be empty')
    .isNumeric().withMessage('id_desa should be numeric'),
    check('address')
    .not().isEmpty().withMessage('address should not be empty'),
    check('postcode')
    .not().isEmpty().withMessage('postcode should not be empty'),
    check('telepon')
    .not().isEmpty().withMessage('telepon should not be empty')
    .isNumeric().withMessage('telepon should be numeric')
    .isLength({min : 5, max : 14}),
    check('email')
    .not().isEmpty().withMessage('email should not be empty')
    .isEmail().withMessage('your email is invalid'),
    check('password')
    .not().isEmpty().withMessage('password should not be empty')
    .isLength({min : 5}),
]

module.exports.login = [
    check('email')
    .not().isEmpty().withMessage('email should not be empty')
    .isEmail().withMessage('your email is invalid'),
    check('password')
    .not().isEmpty().withMessage('password should not be empty')
    .isLength({min : 5}),
    
]

module.exports.edit = [
    check('name')
    .not().isEmpty().withMessage('name should not be empty'),
    check('id_provinsi')
    .not().isEmpty().withMessage('id_provinsi should not be empty')
    .isNumeric().withMessage('id_provinsi should be numeric'),
    check('id_kabupaten')
    .not().isEmpty().withMessage('id_kabupaten should not be empty')
    .isNumeric().withMessage('id_kabupaten should be numeric'),
    check('id_kecamatan')
    .not().isEmpty().withMessage('id_kecamatan should not be empty')
    .isNumeric().withMessage('id_kecamatan should be numeric'),
    check('id_desa')
    .not().isEmpty().withMessage('id_desa should not be empty')
    .isNumeric().withMessage('id_desa should be numeric'),
    check('address')
    .not().isEmpty().withMessage('address should not be empty'),
    check('postcode')
    .not().isEmpty().withMessage('postcode should not be empty'),
    check('telepon')
    .not().isEmpty().withMessage('telepon should not be empty')
    .isNumeric().withMessage('telepon should be numeric')
    .isLength({min : 5, max : 14}),
    check('email')
    .not().isEmpty().withMessage('email should not be empty')
    .isEmail().withMessage('your email is invalid'),
]