const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.post('/file_seller/create', async(req, res) => {
    try {
        const simpan = await database('file_seller').insert(req.body);
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

router.get('/file_seller/all', async(req, res) => {
    try {
        const result = await database.select('*').from('file_seller');
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

router.get('/file_seller/one/:id_file_seller', async(req, res) => {
    try {
        const result = await database("file_seller").select('*').where('id_file_seller', req.params.id_file_seller).first();
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


router.put('/file_seller/edit/:id_file_seller', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('file_seller').where('id_file_seller', req.params.id_file_seller).first();
        if (result) {
            await database('file_seller').update(data).where('id_file_seller', req.params.id_file_seller);
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

router.delete('/file_seller/delete/:id_file_seller', async(req, res) => {
    try {
        const result = await database ('file_seller').where('id_file_seller', req.params.id_file_seller).first();
        if (result) {
            await database ('file_seller').where('id_file_seller', req.params.id_file_seller).delete();
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