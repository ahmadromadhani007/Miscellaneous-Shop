const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/restock/create', async(req, res) => {
    try {
        const simpan = await database('restock').insert(req.body);
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

router.get('/restock/all', async(req, res) => {
    try {
        const result = await database.select('*').from('restock');
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

router.get('/restock/one/:id_restrock', async(req, res) => {
    try {
        const result = await database("restock").select('*').where('id_restrock', req.params.id_restrock).first();
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


router.put('/restock/edit/:id_restrock', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('restock').where('id_restrock', req.params.id_restrock).first();
        if (result) {
            await database('restock').update(data).where('id_restrock', req.params.id_restrock);
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

router.delete('/restock/delete/:id_restrock', async(req, res) => {
    try {
        const result = await database ('restock').where('id_restrock', req.params.id_restrock).first();
        if (result) {
            await database ('restock').where('id_restrock', req.params.id_restrock).delete();
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