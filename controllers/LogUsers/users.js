const express = require('express');
const router = express.Router();
const database = require('../../config/database');
const validasi_data = require('./data_users_validations');
const verifikasi_validasi_data = require('../../middleware/verifikasi_validasi_data');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifikasi_token = require('../../middleware/verifikasi_token');

router.post('/user/register', validasi_data.daftar, verifikasi_validasi_data, async(req, res) => {
    const data = req.body;
    try {
        const isTelepon = await database('user').select('*').where('telepon', data.telepon).first();
        if (isTelepon) {
            return res.status(400).json({
                status: 0,
                message: "Telepon has been used",
                result: isTelepon
            });
        }
        const isEmail = await database('user').select('*').where('email', data.email).first();
        if (isEmail) {
            return res.status(400).json({
                status: 0,
                message: "Email has been used",
                result: isEmail
            });
        }

        const createUser = {
            ...data,
            ex_token: new Date(),
            password: bcrypt.hashSync(data.password, 14)
        }
        const simpan = await database('user').insert(createUser);
        return res.status(201).json({
            status: 1,
            message: "Success",
            result : {
                id_user: simpan[0],
                ...createUser
            }
        })

    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.message
        });

    } 
});

router.get('/user/all', verifikasi_token, async(req, res) => {
    try {
        const result = await database.raw(`SELECT user.*, provinsi.nama_provinsi,kabupaten.nama_kabupaten,kecamatan.nama_kecamatan,desa.nama_desa FROM user
        LEFT OUTER JOIN provinsi on provinsi.id_provinsi = user.id_provinsi
        LEFT OUTER JOIN kabupaten on kabupaten.id_kabupaten = user.id_kabupaten
        LEFT OUTER JOIN kecamatan on kecamatan.id_kecamatan = user.id_kecamatan
        LEFT OUTER JOIN desa on desa.id_desa = user.id_desa`);
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

router.get('/user/profil/:id_user',  async(req, res) => {
    try {
        const result = await database.raw(`SELECT user.*, provinsi.nama_provinsi,kabupaten.nama_kabupaten,kecamatan.nama_kecamatan,desa.nama_desa FROM user
        LEFT OUTER JOIN provinsi on provinsi.id_provinsi = user.id_provinsi
        LEFT OUTER JOIN kabupaten on kabupaten.id_kabupaten = user.id_kabupaten
        LEFT OUTER JOIN kecamatan on kecamatan.id_kecamatan = user.id_kecamatan
        LEFT OUTER JOIN desa on desa.id_desa = user.id_desa
        WHERE user.id_user = '${req.params.id_user}'`);
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

router.post('/user/login', validasi_data.login, verifikasi_validasi_data, async(req, res) => {
    const data = req.body;
    const random = Math.floor(Math.random() * (999999 - 100000 + 1) + (1000000));
    try {  
        const login = await database('user').where('email',data.email).first();
        if (login) {
            if(bcrypt.compareSync(data.password,login.password)) {  
                await database ('user').update('verifikasi_code', random).where('email', data.email);
                return res.status(200).json({
                    status: 1,
                    message: "Welcome user"
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

router.post('/user/verifikasi_code',  async(req, res) => {
    try {
        const result = await database.raw(`SELECT user.*, provinsi.nama_provinsi,kabupaten.nama_kabupaten,kecamatan.nama_kecamatan,desa.nama_desa FROM user
        LEFT OUTER JOIN provinsi on provinsi.id_provinsi = user.id_provinsi
        LEFT OUTER JOIN kabupaten on kabupaten.id_kabupaten = user.id_kabupaten
        LEFT OUTER JOIN kecamatan on kecamatan.id_kecamatan = user.id_kecamatan
        LEFT OUTER JOIN desa on desa.id_desa = user.id_desa
        WHERE user.verifikasi_code = '${req.body.verifikasi_code}'`);
        const hasil_data = result[0][0]
        if (hasil_data) {
                var array_data = {};
                array_data['id_user'] = hasil_data.id_user
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
            await database('user').update('token', token).where('id_user', hasil_data.id_user);
            
            res.cookie('token', token, {
                httpOnly : true
            })
                return res.status(200).json({
                status: 1,
                message: "Welcome user",
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

router.put('/user/edit/password/:id_user', async(req, res) => {
    try {
        const result = await database('user').where('id_user', req.params.id_user).first();
        if (result) {
            if (req.body.password_1 == req.body.password_2) {
                const newPassword = bcrypt.hashSync(req.body.password_2, 12);
                await database ('user').update('password', newPassword).where('id_user', req.params.id_user);
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

router.delete('/user/delete/:id_user', async(req, res) => {
    try {
        const result = await database ('user').where('id_user', req.params.id_user).first();
        if (result) {
            await database ('user').where('id_user', req.params.id_user).delete();
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