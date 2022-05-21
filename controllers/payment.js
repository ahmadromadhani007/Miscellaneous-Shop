const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/payment/create', async(req, res) => {
    const data = req.body;
    const input = {
        ...data
    }
    try {
        const simpan = await database('payment').insert(input);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_payment: simpan[0],
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

router.get('/payment/all', async(req, res) => {
    try {
        const result = await database.select('*').from('payment');
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

router.get('/payment/one/:id_payment', async(req, res) => {
    try {
        const result = await database("payment").select('*').where('id_payment', req.params.id_payment).first();
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


router.put('/payment/edit/:id_payment', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('payment').where('id_payment', req.params.id_payment).first();
        if (result) {
            await database('payment').update(data).where('id_payment', req.params.id_payment);
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

router.delete('/payment/delete/:id_payment', async(req, res) => {
    try {
        const result = await database ('payment').where('id_payment', req.params.id_payment).first();
        if (result) {
            await database ('payment').where('id_payment', req.params.id_payment).delete();
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