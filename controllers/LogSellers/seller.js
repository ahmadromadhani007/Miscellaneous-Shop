const express = require('express');
const router = express.Router();
const database = require('../../config/database');
const validasi_data = require('./data_seller_validations');
const verifikasi_validasi_data = require('../../middleware/verifikasi_validasi_data');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifikasi_token = require('../../middleware/verifikasi_token');

router.post('/seller/register', validasi_data.daftar, verifikasi_validasi_data, async(req, res) => {
    const data = req.body;
    try {
        const isTelepon = await database('seller').select('*').where('telepon', data.telepon).first();
        if (isTelepon) {
            return res.status(400).json({
                status: 0,
                message: "Telepon has been used",
                result: isTelepon
            });
        }
        const isEmail = await database('seller').select('*').where('email', data.email).first();
        if (isEmail) {
            return res.status(400).json({
                status: 0,
                message: "Email has been used",
                result: isEmail
            });
        }

        const createseller = {
            ...data,
            ex_token: new Date(),
            password: bcrypt.hashSync(data.password, 14)
        }
        const simpan = await database('seller').insert(createseller);
        return res.status(201).json({
            status: 1,
            message: "Success",
            result : {
                id_seller: simpan[0],
                ...createseller
            }
        })

    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.message
        });

    } 
});

router.get('/seller/all', verifikasi_token, async(req, res) => {
    try {
        const result = await database.raw(`SELECT seller.*, provinsi.nama_provinsi,kabupaten.nama_kabupaten,kecamatan.nama_kecamatan,desa.nama_desa FROM seller
        LEFT OUTER JOIN provinsi on provinsi.id_provinsi = seller.id_provinsi
        LEFT OUTER JOIN kabupaten on kabupaten.id_kabupaten = seller.id_kabupaten
        LEFT OUTER JOIN kecamatan on kecamatan.id_kecamatan = seller.id_kecamatan
        LEFT OUTER JOIN desa on desa.id_desa = seller.id_desa`);
        const hasil_data = result[0];
        if (hasil_data.length > 0) {
            res.status(200).json({
                status: 1,
                message: 'Success',
                result : hasil_data 
            });
        } else {
            return res.status(400).json({
                status: 0,
                message: 'Data Not Found'
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.message
        });

    } 
});

router.get('/seller/profil/:id_seller',  async(req, res) => {
    try {
        const result = await database.raw(`SELECT seller.*, provinsi.nama_provinsi,kabupaten.nama_kabupaten,kecamatan.nama_kecamatan,desa.nama_desa FROM seller
        LEFT OUTER JOIN provinsi on provinsi.id_provinsi = seller.id_provinsi
        LEFT OUTER JOIN kabupaten on kabupaten.id_kabupaten = seller.id_kabupaten
        LEFT OUTER JOIN kecamatan on kecamatan.id_kecamatan = seller.id_kecamatan
        LEFT OUTER JOIN desa on desa.id_desa = seller.id_desa
        WHERE seller.id_seller = '${req.params.id_seller}'`);
        const hasil_data = result[0][0]
        if (hasil_data) {
        return res.status(200).json({
            status: 1,
            message: 'Success',
            result : hasil_data
        });

    }else{
        return res.status(400).json({
            status: 0,
            message: 'Data Not Found'
        });
    
    }

    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.message
        });

    } 
});

router.post('/seller/login', validasi_data.login, verifikasi_validasi_data, async(req, res) => {
    const data = req.body;
    const random = Math.floor(Math.random() * (999999 - 100000 + 1) + (1000000));
    try {  
        const login = await database('seller').where('email',data.email).first();
        if (login) {
            if(bcrypt.compareSync(data.password,login.password)) {  
                await database ('seller').update('verifikasi_code', random).where('email', data.email);
                return res.status(200).json({
                    status: 1,
                    message: "Welcome seller"
                })
            }else {
                return res.status(401).json({
                    status: 0,
                    message: "Password is wrong"
                }); 
            }
        } else {
            return res.status(400).json({
                status: 0,
                message: "Email is not valid"
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.message
        });

    } 
});

router.post('/seller/verifikasi_code',  async(req, res) => {
    try {
        const result = await database.raw(`SELECT seller.*, provinsi.nama_provinsi,kabupaten.nama_kabupaten,kecamatan.nama_kecamatan,desa.nama_desa FROM seller
        LEFT OUTER JOIN provinsi on provinsi.id_provinsi = seller.id_provinsi
        LEFT OUTER JOIN kabupaten on kabupaten.id_kabupaten = seller.id_kabupaten
        LEFT OUTER JOIN kecamatan on kecamatan.id_kecamatan = seller.id_kecamatan
        LEFT OUTER JOIN desa on desa.id_desa = seller.id_desa
        WHERE seller.verifikasi_code = '${req.body.verifikasi_code}'`);
        const hasil_data = result[0][0]
        if (hasil_data) {
                var array_data = {};
                array_data['id_seller'] = hasil_data.id_seller
                array_data['name'] = hasil_data.name
                array_data['nama_provinsi'] = hasil_data.nama_provinsi
                array_data['nama_kabupaten'] = hasil_data.nama_kabupaten
                array_data['nama_kecamatan'] = hasil_data.nama_kecamatan
                array_data['nama_desa'] = hasil_data.nama_desa
                array_data['address'] = hasil_data.alamat
                array_data['telepon'] = hasil_data.telepon
                array_data['email'] = hasil_data.email

            const access_token = jwt.sign({array_data}, 
                "JWT HAS BEEN SUCCESSFULLY GENERATED",{   expiresIn : '1h'});
            
            const token = jwt.sign({array_data}, 
                "JWT HAS BEEN SUCCESSFULLY GENERATED",{   expiresIn : '7d'});
            await database('seller').update('token', token).where('id_seller', hasil_data.id_seller);
            
            res.cookie('token', token, {
                httpOnly : true
            })
                return res.status(200).json({
                status: 1,
                message: "Welcome seller",
                result: array_data,
                token : access_token
            })
    }else{
        return res.status(400).json({
            status: 0,
            message: 'Data Not Found'
        });
    
    }
    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.message
        });

    } 
});

router.put('/seller/edit/password/:id_seller', async(req, res) => {
    try {
        const result = await database('seller').where('id_seller', req.params.id_seller).first();
        if (result) {
            if (req.body.password_1 == req.body.password_2) {
                const newPassword = bcrypt.hashSync(req.body.password_2, 12);
                await database ('seller').update('password', newPassword).where('id_seller', req.params.id_seller);
                return res.status(200).json({
                    status: 1,
                    message: "Success"
                })

            } else {
                return res.status(400).json({
                    status: 0,
                    message: "Password is not same"
                })
            }
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

router.delete('/seller/delete/:id_seller', async(req, res) => {
    try {
        const result = await database ('seller').where('id_seller', req.params.id_seller).first();
        if (result) {
            await database ('seller').where('id_seller', req.params.id_seller).delete();
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