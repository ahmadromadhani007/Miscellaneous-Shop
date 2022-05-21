const express = require('express');
const router = express.Router();
const database = require('../config/database');
const verifikasi_token = require('../middleware/verifikasi_token');

router.post('/brands/create', async(req, res) => {
    const data = req.body;
    const input = {
        ...data
    }
    try {
        const simpan = await database('brands').insert(input);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_brands: simpan[0],
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

router.get('/brands/all', verifikasi_token, async(req, res) => {
    try {
        const result = await database.select('*').from('brands');
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

router.get('/brands/one/:id_brands', async(req, res) => {
    try {
        const result = await database("brands").select('*').where('id_brands', req.params.id_brands).first();
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


router.put('/brands/edit/:id_brands', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('brands').where('id_brands', req.params.id_brands).first();
        if (result) {
            await database('brands').update(data).where('id_brands', req.params.id_brands);
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

router.delete('/brands/delete/:id_brands', async(req, res) => {
    try {
        const result = await database ('brands').where('id_brands', req.params.id_brands).first();
        if (result) {
            await database ('brands').where('id_brands', req.params.id_brands).delete();
            return res.status(200).json({
                status: 1,
                message: "Success"
            })
        } else {
            return res.status(400).json({
                status: 0,
                message: "Data not found"
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.message
        });
    }
});

module.exports = router;