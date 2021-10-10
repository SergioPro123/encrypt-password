const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const funciones = require('./funciones/funciones');

const app = express();

const Usuario = require('../models/usuario');

app.get('/login', (req, res) => {
    return res.render('login.hbs');
});

//Comprueba si existe un usuario.
app.post('/login', (req, res) => {
    let body = req.body;
    let usuario = {
        correo: body.correo,
        estado: true,
        google: false,
    };
    Usuario.findOne(usuario, (err, usuarioDB) => {
        if (err) {
            return res.json({
                ok: false,
                err,
            });
        } else {
            if (!usuarioDB) {
                return res.json({
                    ok: false,
                    err: {
                        message: 'Datos Incorrectos.',
                    },
                });
            } else {
                if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                    return res.json({
                        ok: false,
                        err: {
                            message: 'Datos Incorrectos.',
                        },
                    });
                } else {
                    //Si llega a este punto, es por que se valido los datos correctmente.
                    let token = jwt.sign(
                        {
                            usuario: usuarioDB,
                        },
                        process.env.SEED,
                        { expiresIn: process.env.CADUCIDAD_TOKEN }
                    );

                    return res.json({
                        ok: true,
                        data: usuarioDB,
                        token,
                    });
                }
            }
        }
    });
});

module.exports = {
    app,
};
