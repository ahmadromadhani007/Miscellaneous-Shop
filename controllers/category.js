const express = require('express');
const router = express.Router();
const database = require('../config/database');
const verifikasi_token = require('../middleware/verifikasi_token');

router.get('/category/all', verifikasi_token, async(req, res) => {
    try {
        const result = await database.select('*').from('category');
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

router.post('/category/create', async(req, res) => {
    const data = req.body;
    const input = {
        ...data,
        status : 'Y'
    }
    try {
        const simpan = await database('category').insert(input);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_category: simpan[0],
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

router.put('/category/edit/:id_category', async(req, res) => {
    const data = req.body;
    try {
        const result = await database('category').where('id_category', req.params.id_category).first();
        if (result) {
            await database('category').update(data).where('id_category', req.params.id_category);
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

router.delete('/category/delete/:id_category', async(req, res) => {
    
    try {
        const update = await database('category').update('status', 't').where('id_category', req.params.id_category);
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

router.get('/category/one/:id_category', async(req, res) => {
    try {
        const result = await database("category").select('*').where('id_category', req.params.id_category).first();
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

router.get('/category/:name', async(req, res) => {
    try {
        const result = await database.select('*').from('category').whereILike('name', '%' + req.params.name + '%');
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

module.exports = router;