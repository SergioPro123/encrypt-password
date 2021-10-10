$(document).ready(function () {
    $.validator.addMethod(
        'mypassword',
        function (value, element) {
            return (
                this.optional(element) ||
                (value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/) && value.match(/[0-9]/))
            );
        },
        'La contraseña debe contener minimo un caracter especial.'
    );
    $('form#formRegister').validate({
        submitHandler: registro,
        rules: {
            password: {
                required: true,
                minlength: 8,
                mypassword: true,
            },
        },
    });

    //Enviar Formulario y recibir Token.
    function registro() {
        let nombre = $('input#nombre').val().toLowerCase();
        let correo = $('input#correo').val().toLowerCase();
        let password = $('input#password').val();
        let data = {
            nombre,
            correo,
            password,
        };
        //Enviamos los datos hacia la API '/login'
        $.ajax({
            url: '/usuario',
            type: 'POST',
            data: data,
            success: function (result) {
                //Si resulto.ok = true, el usuario queda registrado correctamente.
                if (result.ok) {
                    //Ahora procedemos a logearnos
                    login(data);
                    $('#errorRegistro').text('');
                } else {
                    $('#errorRegistro').text('Hubo un error, intente nuevamente.');
                }
            },
            error: function (e) {
                // log error in browser
                console.log(e);
                $('#errorRegistro').text('Hubo un error, intente nuevamente.');
            },
        });
    }
});
