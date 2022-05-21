const express = require('express');
const router = express.Router();
const database = require('../config/database');
const data_validations = require('./data_validations');
const verifikasi_validasi_data = require('../middleware/verifikasi_validasi_data');

router.post('/products/create', data_validations.data, verifikasi_validasi_data, async(req, res) => {
    const data = req.body;
    const input = {
        ...data,
        status: 'Y'
    }
    try {
        const simpan = await database('products').insert(input);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_product: simpan[0],
                    ...input
                }
            })   
    } else {
        return res.status(400).json({
            status: 0,
            message: "Failed",
        })
    }

} catch (error) {
        return res.status(500).json({
            status:0,
            message: error.message
        })
    }
});

router.get('/products/all', async(req, res) => {
    try {
        const result = await database.select('*').from('products');
        if (result.length > 0){
            return res.status(200).json({
                status: 1,
                message: "Success",
                data: result
        })
    } else {
        return res.status(400).json({
            status: 0,
            message: "Data not found",
        })
    }
} catch (error) {
        return res.status(500).json({
            status:0,
            message: error.message
        })
    }
});

router.get('/products/one/:id_products', async(req, res) => {
    try {
        const result = await database("products").select('*').where('id_products', req.params.id_products).first();
        if (result) {
            return res.status(200).json({
                status: 1,
                message: "Success",
                result : result
            })
        } else { 
            return res.status(400).json({
                status: 0,
                message: "Data not found",
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            status:0,
            message: error.message
        })
    }
});

router.put('/products/edit/:id_products', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('products').where('id_products', req.params.id_products).first();
        if (result) {
            await database('products').update(data).where('id_products', req.params.id_products);
            return res.status(200).json({
                status: 1,
                message: "Success",
            })  
        }else {
            return res.status(400).json({
                status: 0,
                message: "Data not found",
            })
        }

} catch (error) {
        return res.status(500).json({
            status:0,
            message: error.message
        })
    }
});

router.delete('/products/delete/:id_products', async(req, res) => {
    
    try {
        const update = await database('products').update('status', 'n').where('id_products', req.params.id_products);
        if (update){
            return res.status(200).json({
                status: 1,
                message: "Success",
            })
        } else {
            return res.status(400).json({
                status: 0,
                message: "Failed",
            })
        }        
    } catch (error) {
        return res.status(500).json({
            status:0,
            message: error.message
        })
    }
});

module.exports = router;