const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/transaction_details/create', async(req, res) => {
    try {
        const simpan = await database('transaction_details').insert(req.body);
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

router.get('/transaction_details/all', async(req, res) => {
    try {
        const result = await database.select('*').from('transaction_details');
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

router.get('/transaction_details/one/:id_transaction_details', async(req, res) => {
    try {
        const result = await database("transaction_details").select('*').where('id_transaction_details', req.params.id_transaction_details).first();
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


router.put('/transaction_details/edit/:id_transaction_details', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('transaction_details').where('id_transaction_details', req.params.id_transaction_details).first();
        if (result) {
            await database('transaction_details').update(data).where('id_transaction_details', req.params.id_transaction_details);
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

router.delete('/transaction_details/delete/:id_transaction_details', async(req, res) => {
    try {
        const result = await database ('transaction_details').where('id_transaction_details', req.params.id_transaction_details).first();
        if (result) {
            await database ('transaction_details').where('id_transaction_details', req.params.id_transaction_details).delete();
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