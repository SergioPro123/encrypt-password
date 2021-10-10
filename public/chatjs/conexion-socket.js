var socket = io();
//on = Escuchar Información
//emit = Emitir información
var usuario;
socket.on('connect', function() {
    // console.log("Conectado al Servidor");
    if (!localStorage.getItem('Authorization')) {
        $(location).attr('href', '/login');
    } else {
        //Enviamos el token para que valide el usuario
        socket.emit('login', localStorage.getItem('Authorization'), function(data) {
            //Si devuelve 'FALSE', redireccionamos a nuestra pagina de login.
            if (!data.ok || !data) {
                $(location).attr('href', '/login');
            }
            usuario = data.usuario;
        });
    }
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el Servidor');

});