const { io } = require('../server');
const jwt = require('jsonwebtoken');
const { Usuarios } = require('../class/usuario');

const usuarios = new Usuarios();

io.on('connection', (client) => {
    client.on('disconnect', () => {
        usuarios.borrarPersonasById(client.id);
        client.broadcast.emit('listaContactos', usuarios.getPersonas());
    });

    //Todos los usuarios conectados deben ser logeados.
    client.on('login', (token, callback) => {
        let usuario;
        jwt.verify(token, process.env.SEED, (err, decode) => {
            if (err) {
                let data = {
                    ok: false
                };
                return callback(data);
            } else {
                usuario = decode.usuario;
                let data = {
                    ok: true,
                    usuario
                };
                usuarios.agregarPersona(client.id, usuario._id, usuario.nombre, usuario.correo, usuario.img);
                callback(data);
            }
        });
    });

    client.on('enviarMsjPrivado', (data) => {
        let dataSocket = usuarios.getPersonaByIdDataBase(data.idDataBaseReceptor);
        //Enviamos un Mjs Privado a un solo usuario, pero se pueden enviar mas de uno por si 
        //el mismo usuario esta conectado en diferentes dispositivos.
        data.emisor = usuarios.getPersonaByIdDataBase(data.emisor)[0];
        for (let i = 0; i < dataSocket.length; i++) {
            client.to(dataSocket[i].idSocket).emit('enviarMsjPrivado', data);
        }

    });
    //devolvemos la lista de contactos
    client.on('listaContactos', (data) => {
        client.broadcast.emit('listaContactos', usuarios.getPersonas());
        client.emit('listaContactos', usuarios.getPersonas());
    });

});