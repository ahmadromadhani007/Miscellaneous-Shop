const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/transaction/create', async(req, res) => {
    try {
        const simpan = await database('transaction').insert(req.body);
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

router.get('/transaction/all', async(req, res) => {
    try {
        const result = await database.select('*').from('transaction');
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

router.get('/transaction/one/:id_transaction', async(req, res) => {
    try {
        const result = await database("transaction").select('*').where('id_transaction', req.params.id_transaction).first();
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


router.put('/transaction/edit/:id_transaction', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('transaction').where('id_transaction', req.params.id_transaction).first();
        if (result) {
            await database('transaction').update(data).where('id_transaction', req.params.id_transaction);
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

router.delete('/transaction/delete/:id_transaction', async(req, res) => {
    try {
        const result = await database ('transaction').where('id_transaction', req.params.id_transaction).first();
        if (result) {
            await database ('transaction').where('id_transaction', req.params.id_transaction).delete();
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