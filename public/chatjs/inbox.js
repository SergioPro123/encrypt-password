var username = usuario.nombre;
var Ses_img = "Bylancer.jpg";
var audioogg = new Audio('audio/chat.ogg');
var audiomp3 = new Audio('audio/chat.mp3');

function scrollDown() {
    var wtf = $('.wchat-chat-body');
    var height = wtf[0].scrollHeight;
    wtf.scrollTop(height);
    $(".scroll-down").css({ 'visibility': 'hidden' });
}

function chatWith(chatuser, toid, img, status) {
    if ($("#pane-intro").css('visibility') == 'visible') {
        $("#pane-intro").css({ 'visibility': 'hidden' });
        $(".chat-right-aside").css({ 'visibility': 'visible' });
    }

    createChatBox(chatuser, toid, img, status);

    scrollDown();

    $('.right .top').attr("data-user", chatuser)
        .attr("data-image", img);
}

function createChatBox(chatboxtitle, toid, img, status, minimizeChatBox) {
    var chatFormTpl =
        '<div class="block-wchat" id="chatForm_' + chatboxtitle + '">' +
        '<div id="typing_on"></div>' +
        '<button class="icon ti-face-smile font-24 btn-emoji" onclick="javascript:chatemoji()" href="javascript:void(0)" id="toggle-emoji"></button>' +
        '<div tabindex="-1" class="input-container">' +
        '<div tabindex="-1" class="input-emoji">' +
        '<div class="input-placeholder" style="visibility: visible;display:none;">Type a message</div>' +
        '<textarea class="input chatboxtextarea" id="chatboxtextarea" name="chattxt" onkeydown="javascript:return checkChatBoxInputKey(event,this,\'' + chatboxtitle + '\',\'' + toid + '\',\'' + img + '\');" contenteditable spellcheck="true" style="resize:none;height:20px" placeholder="Type a message"></textarea>' +
        '</div>' +
        '</div>' +
        '<button onclick="javascript:return clickTosendMessage(\'' + chatboxtitle + '\',\'' + toid + '\',\'' + img + '\');" class="btn-icon icon-send fa fa-paper-plane-o font-24 send-container"></button>' +
        '</div>';


    if ($("#chatbox_" + chatboxtitle).length > 0) {

        $("#chatFrom").html(chatFormTpl);

        $(".chatboxtextarea").focus();
        return;
    }


    $(" <div />").attr("id", "chatbox_" + chatboxtitle)
        .addClass("chat chatboxcontent active-chat")
        .attr("data-chat", "person_" + toid)
        .attr("client", chatboxtitle)
        .html('<span class="hidecontent"></span>')
        .appendTo($("#resultchat"));
    if (minimizeChatBox != 1) {
        $("#chatFrom").html(chatFormTpl);
    }
}

function checkChatBoxInputKey(event, chatboxtextarea, chatboxtitle, toid, img, send) {

    $(".input-placeholder").css({ 'visibility': 'hidden' });

    if ((event.keyCode == 13 && event.shiftKey == 0) || (send == 1)) {
        // console.log(`${event}  ${chatboxtextarea}  ${chatboxtitle}  ${toid}  ${img}  ${send}`);
        message = $(chatboxtextarea).val();
        message = message.replace(/^\s+|\s+$/g, "");
        $(chatboxtextarea).val('');
        $(chatboxtextarea).focus();
        $(".input-placeholder").css({ 'visibility': 'visible' });
        $(".chatboxtextarea").css('height', '20px');
        if (message != '') {
            //Adjuntamos los datos a emitir por Sockets.
            enviarMsjPrivado(toid, message);
            message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
            message = message.replace(/\n/g, "<br />");
            var $con = message;
            var $words = $con.split(' ');
            for (i in $words) {
                if ($words[i].indexOf('http://') == 0 || $words[i].indexOf('https://') == 0) {
                    $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
                } else if ($words[i].indexOf('www') == 0) {
                    $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
                }
            }
            message = $words.join(' ');
            message = emojione.shortnameToImage(message); // Set imotions
            $("#chatbox_" + chatboxtitle).append('<div class="col-xs-12 p-b-10 odd">' +
                '<div class="chat-image  profile-picture max-profile-picture">' +
                `<img alt="${username }" src="${img || "storage/user_image/avatar_default.png"}">` +
                '</div>' +
                '<div class="chat-body">' +
                '<div class="chat-text">' +
                '<h4>' + username + '</h4>' +
                '<p>' + message + '</p>' +
                '<b>Just Now</b><span class="msg-status msg-' + chatboxtitle + '"><i class="fa fa-check"></i></span>' +
                '</div>' +
                '</div>' +
                '</div>');

            $(".target-emoji").css({ 'display': 'none' });
            $('.wchat-filler').css({ 'height': 0 + 'px' });

            scrollDown();
        }

        return false;
    }

    var adjustedHeight = chatboxtextarea.clientHeight;
    var maxHeight = 60;

    if (maxHeight > adjustedHeight) {
        adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);

        if (maxHeight)
            adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if (adjustedHeight > chatboxtextarea.clientHeight)
            $(chatboxtextarea).css('height', adjustedHeight + 8 + 'px');
    } else {
        $(chatboxtextarea).css('overflow', 'auto');
    }

}

function clickTosendMessage(chatboxtitle, toid, img) {

    message = $(".chatboxtextarea").val();

    message = message.replace(/^\s+|\s+$/g, "");

    $(".chatboxtextarea").val('');
    $(".chatboxtextarea").focus();
    $(".input-placeholder").css({ 'visibility': 'visible' });
    $(".chatboxtextarea").css('height', '20px');
    if (message != '') {
        //Adjuntamos los datos a emitir por Sockets.
        enviarMsjPrivado(toid, message);
        message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
        message = message.replace(/\n/g, "<br />");
        var $con = message;
        var $words = $con.split(' ');
        for (i in $words) {
            if ($words[i].indexOf('http://') == 0 || $words[i].indexOf('https://') == 0) {
                $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
            } else if ($words[i].indexOf('www') == 0) {
                $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
            }
        }
        message = $words.join(' ');
        message = emojione.shortnameToImage(message); // Set imotions

        $("#chatbox_" + chatboxtitle).append('<div class="col-xs-12 p-b-10 odd">' +
            '<div class="chat-image  profile-picture max-profile-picture">' +
            `<img alt="${username }" src="${img || "storage/user_image/avatar_default.png"}">` +
            '</div>' +
            '<div class="chat-body">' +
            '<div class="chat-text">' +
            '<h4>' + username + '</h4>' +
            '<p>' + message + '</p>' +
            '<b>Just Now</b><span class="msg-status msg-' + chatboxtitle + '"><i class="fa fa-check"></i></span>' +
            '</div>' +
            '</div>' +
            '</div>');

        $(".target-emoji").css({ 'display': 'none' });
        $('.wchat-filler').css({ 'height': 0 + 'px' });
        scrollDown();
    }



    var adjustedHeight = $(".chatboxtextarea").clientHeight;
    var maxHeight = 40;

    if (maxHeight > adjustedHeight) {
        adjustedHeight = Math.max($(".chatboxtextarea").scrollHeight, adjustedHeight);
        if (maxHeight)
            adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if (adjustedHeight > $(".chatboxtextarea").clientHeight)
            $($(".chatboxtextarea")).css('height', adjustedHeight + 8 + 'px');
    } else {
        $($(".chatboxtextarea")).css('overflow', 'auto');
    }
    return false;
}

/* Mis Configuariciones */

function crearMensajeRecibido(data) {

    message = data.msj;

    $(".chatboxtextarea").val('');
    $(".chatboxtextarea").focus();
    $(".input-placeholder").css({ 'visibility': 'visible' });
    $(".chatboxtextarea").css('height', '20px');

    message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
    message = message.replace(/\n/g, "<br />");
    var $con = message;
    var $words = $con.split(' ');
    for (i in $words) {
        if ($words[i].indexOf('http://') == 0 || $words[i].indexOf('https://') == 0) {
            $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
        } else if ($words[i].indexOf('www') == 0) {
            $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
        }
    }
    message = $words.join(' ');
    message = emojione.shortnameToImage(message); // Set imotions
    let nombre = data.emisor.nombre.split(" ");
    $("#chatbox_" + data.emisor.idDataBase).append('<div class="col-xs-12 p-b-10">' +
        '<div class="chat-image  profile-picture max-profile-picture">' +
        `<img alt="img" src="${data.emisor.img || "storage/user_image/avatar_default.png"}" class="bg-theme">` +
        '</div>' +
        '<div class="chat-body">' +
        '<div class="chat-text">' +
        `<h4>${nombre[0]} ${nombre[1] || ""}</h4>` +
        '<p>' + message + '</p>' +
        '<b>' + data.hora + '</b>' +
        '</div>' +
        '</div>' +
        '</div>');

    $(".target-emoji").css({ 'display': 'none' });
    $('.wchat-filler').css({ 'height': 0 + 'px' });
    scrollDown();


};

function crearContacto(nombre, idDataBase, img) {
    let primerNombre = nombre.split(" ");
    let onclick = `javascript:chatWith('${idDataBase}','${idDataBase}','${usuario.img}','Online')`;
    let contacto = '';
    contacto += `<li class=" chatboxhead" id="chatbox1_${idDataBase}" data-chat="person_${idDataBase}" href="javascript:void(0)" onclick="${onclick}">`;
    contacto += '<a href="javascript:void(0)">';
    contacto += `<span class="userimage profile-picture min-profile-picture"><img src="${img}" alt=":(" class="avatar-image is-loaded bg-theme" width="100%"></span>`;
    contacto += '<span>';
    contacto += `<span class="bname personName">${primerNombre[0]} ${primerNombre[1] || ""}</span>`;
    contacto += '<span class="personStatus"><span class="time Online"><i class="fa fa-circle" aria-hidden="true"></i></span></span>';
    //contacto += '<span class="count"><span class="icon-meta unread-count">2</span></span><br>';
    contacto += '<small class="preview"><span class="Online">Online</span></small>';
    contacto += '</span>';
    contacto += '</a>';
    contacto += '</li>';
    $('ul#display').append(contacto);
    $('#chatbox1_' + idDataBase).addClass('person');

    let conctactoChat = `<div id="chatbox_${idDataBase}" class="chat chatboxcontent" data-chat="person_${idDataBase}" client="${idDataBase}"></div>`;

    $('div#resultchat').append(conctactoChat);


};

function eliminarContacto(idDataBase) {
    $(`li[data-chat='${idDataBase}']`).remove();
    $('div#resultchat').children(`div[data-chat='${idDataBase}']`).remove();
};




function enviarMsjPrivado(idDataBase, msj) {
    let data = {
        emisor: usuario._id,
        idDataBaseReceptor: idDataBase,
        msj,
        hora: new Date().getHours() + " : " + new Date().getMinutes()
    };
    socket.emit('enviarMsjPrivado', data);
};