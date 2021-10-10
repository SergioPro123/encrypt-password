socket.on('listaContactos', function(data) {
    recibirListaContactos(data);
});

socket.on('enviarMsjPrivado', function(data) {
    crearMensajeRecibido(data);
});

function recibirListaContactos(data) {
    let contactos = data.filter(persona => { return persona.idDataBase != usuario._id });
    let contactosCreados = [];

    $('li.person').each(function(index) {
        contactosCreados.push($(this).data('chat'));
    });
    /* PROCEDEMOS A BORRAR CONTACTOS QUE SE DESCONECTAN*/
    for (let i = 0; i < contactosCreados.length; i++) {
        //
        if ((contactos.indexOf("person_" + contactosCreados[i]) < 0)) {
            eliminarContacto(contactosCreados[i]);
            contactosCreados.splice(i, 1);
            i--;
        }
    }
    /* PROCEDEMOS A CREAR CONTACTOS QUE SE CONECTAN */
    for (let i = 0; i < contactos.length; i++) {
        //Si no encuentra un contacto creado, procedemos a crearlo.
        if (contactosCreados.indexOf("person_" + contactos[i].idDataBase) < 0) {
            crearContacto(contactos[i].nombre, contactos[i].idDataBase, contactos[i].img);
            contactosCreados.push("person_" + contactos[i].idDataBase);
        }
    }
    $('.contact-list li').each(function() {
        $(this).attr('data-search-term', $(this).text().toLowerCase());
    });
    $('li.person').on('mousedown', function() {
        if ($(this).hasClass('.active')) {
            return false;
        } else {
            var findChat = $(this).attr('data-chat');
            var personName = $(this).find('.personName').text();
            $('.right .top .personName').html(personName);
            //$('.right .top').attr("data-user",personName);
            var userImage = $(this).find('.userimage').html();
            $('.right .top .userimage').html(userImage);
            var personStatus = $(this).find('.personStatus').html();
            $('.right .top .personStatus').html(personStatus);
            var hideContent = $(this).find('.hidecontent').html();
            $('.right .hidecontent').html(hideContent);
            $('.chat').removeClass('active-chat');
            $('.left .person').removeClass('active');
            $(this).addClass('active');
            $('.chat[data-chat = ' + findChat + ']').addClass('active-chat');
        }

    });
};
socket.emit('listaContactos', null);
//Recivimos la lista de contactos conectados