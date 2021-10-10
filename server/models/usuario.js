const mongoose = require('mongoose');
const uniqueValitor = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let usuarioShema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    correo: {
        unique: true,
        type: String,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'El password es necesario']
    },
    img: {
        type: String,
        default: "storage/user_image/avatar_default.png"
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

usuarioShema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    delete userObject.google;
    delete userObject.estado;
    return userObject;
};

usuarioShema.plugin(uniqueValitor, '{PATH} debe ser único');
module.exports = mongoose.model('Usuario', usuarioShema);