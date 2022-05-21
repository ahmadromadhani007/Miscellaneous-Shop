const express = require('express');
const router = express.Router();
const database = require('../config/database');
const verifikasi_token = require('../middleware/verifikasi_token');

router.post('/courier/create', verifikasi_token, async(req, res) => {
    const data = req.body;
    const input = {
        ...data
    }
    try {
        const simpan = await database('courier').insert(input);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_courier: simpan[0],
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

router.get('/courier/all', async(req, res) => {
    try {
        const result = await database.select('*').from('courier');
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

router.get('/courier/one/:id_courier', async(req, res) => {
    try {
        const result = await database("courier").select('*').where('id_courier', req.params.id_courier).first();
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


router.put('/courier/edit/:id_courier', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('courier').where('id_courier', req.params.id_courier).first();
        if (result) {
            await database('courier').update(data).where('id_courier', req.params.id_courier);
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

router.delete('/courier/delete/:id_courier', async(req, res) => {
    
    try {
        const update = await database('courier').update('status', 'n').where('id_courier', req.params.id_courier);
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