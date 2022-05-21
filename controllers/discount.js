const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/discount/create', async(req, res) => {
    try {
        const simpan = await database('discount').insert(req.body);
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

router.get('/discount/all', async(req, res) => {
    try {
        const result = await database.select('*').from('discount');
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

router.get('/discount/one/:id_discount', async(req, res) => {
    try {
        const result = await database("discount").select('*').where('id_discount', req.params.id_discount).first();
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


router.put('/discount/edit/:id_discount', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('discount').where('id_discount', req.params.id_discount).first();
        if (result) {
            await database('discount').update(data).where('id_discount', req.params.id_discount);
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

router.delete('/discount/delete/:id_discount', async(req, res) => {
    
    try {
        const update = await database('discount').update('status', 'n').where('id_discount', req.params.id_discount);
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