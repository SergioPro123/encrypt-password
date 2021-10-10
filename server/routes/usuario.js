const express = require('express');
const Usuario = require('../models/usuario');
const bcript = require('bcrypt');
const funciones = require('./funciones/funciones');
const app = express();
const { verificaTokenCookie } = require('../middleware/autenticacion');

app.post('/usuario', (req, res) => {
    let body = req.body;
    console.log(body);
    let usuario = new Usuario({
        nombre: body.nombre,
        correo: body.correo,
        password: bcript.hashSync(body.password, 10),
    });

    usuario.save((err, usuarioDB) => {
        funciones.revisarError(err, res, usuarioDB);
    });
});

app.get('/usuarios', verificaTokenCookie, async (req, res) => {
    await Usuario.find({})
        .then((usuarios) => {
            return res.render('list_user', { usuarios: usuarios });
        })
        .catch((err) => {
            return res.render('list_user', { usuarios: {} });
        });
});

module.exports = {
    app,
};
