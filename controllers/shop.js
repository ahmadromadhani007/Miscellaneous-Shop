const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/shop/create', async(req, res) => {
    try {
        const simpan = await database('shop').insert(req.body);
        if (simpan){
            return res.status(201).json({
                success: true,
                message: "Data successfully added",
                data: req.body
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

router.get('/shop/all', async(req, res) => {
    try {
        const result = await database.select('*').from('shop');
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

router.get('/shop/one/:id_shop', async(req, res) => {
    try {
        const result = await database("shop").select('*').where('id_shop', req.params.id_shop).first();
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


router.put('/shop/edit/:id_shop', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('shop').where('id_shop', req.params.id_shop).first();
        if (result) {
            await database('shop').update(data).where('id_shop', req.params.id_shop);
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

router.delete('/shop/delete/:id_shop', async(req, res) => {
    
    try {
        const update = await database('shop').update('status', 'n').where('id_shop', req.params.id_shop);
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