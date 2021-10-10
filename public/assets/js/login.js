$(document).ready(function () {
    //Enviar Formulario y recibir Token.
    $("input[type='submit']").on('click', function (e) {
        e.preventDefault();
        let correo = $('input#correo').val().toLowerCase();
        let password = $('input#password').val();
        let data = {
            correo,
            password,
        };
        login(data);
    });
});
