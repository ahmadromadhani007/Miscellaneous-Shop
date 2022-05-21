const express = require('express');
const router = express.Router();
const database = require('../config/database');
const upload = require('../controllers/foto/multer');
const fs = require('fs');
const path = require('path');

router.post('/promo/create', upload.single('foto'), async(req, res) => {
    const data = {
        name : req.body.name,
        foto : req.file.filename,
        status : 'y'
    }
    try {
        const simpan = await database('promo').insert(data);
        if (simpan){
            return res.status(200).json({
                status: 1,
                message: "Success",
                result: {
                    id_promo: simpan[0],
                    ...data
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

router.get('/promo/all', async(req, res) => {
    try {
        const result = await database.select('*').from('promo');
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

router.get('/promo/one/:id_promo', async(req, res) => {
    try {
        const result = await database("promo").select('*').where('id_promo', req.params.id_promo).first();
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

router.get('/promo/all/:name', async(req, res) => {
    try {
        const result = await database.select('*').from('promo').whereILike('name', '%' + req.params.name + '%');
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

router.post('/promo/edit', upload.single('foto'), async(req, res) => {
    try {
        const result = await database("promo").select('*').where('id_promo', req.body.id_promo).first();
        if (result) {
            if (!req.file) {
             await database.from("promo").update({
                name : req.body.name,
                status : req.body.status
            }).where('id_promo', req.body.id_promo);
            return res.status(200).json({
                status: 1,
                message: "Success",
            })
        } else {
            await database.from("promo").update({
                name : req.body.name,
                foto : req.file.filename,
                status : req.body.status
            }).where('id_promo', req.body.id_promo);
            fs.unlink(path.join(__dirname + '/foto') + result.foto, (err) => {
                if (err) {
                    return res.status(200).json({
                        status: 1,
                        message: "Success",
                        error : err   
                })
            } else {
                return res.status(200).json({
                    status: 1,
                    message: "Success"
                })
             }
          });
            }
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

router.delete('/promo/delete/:id_promo', async(req, res) => {
    
    try {
        const update = await database('promo').update('status', 'N').where('id_promo', req.params.id_promo);
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