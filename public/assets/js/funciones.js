function login(data) {
    //Enviamos los datos hacia la API '/login'
    $.ajax({
        url: '/login',
        type: 'POST',
        data: data,
        success: function (result) {
            if (result.ok) {
                guardarToken(result.token);
            } else {
                let audio = new Audio('audio/datos-incorrectos.mp3');
                audio.play();
                notify('Datos Incorrectos');
            }
        },
        error: function (e) {
            // log error in browser
            console.log(e);
        },
    });
}

function guardarToken(token) {
    document.cookie = 'Authorization=' + token;
    $(location).attr('href', '/usuarios');
}

function cerrarSesion() {
    document.cookie = 'Authorization' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    $(location).attr('href', '/login');
}
