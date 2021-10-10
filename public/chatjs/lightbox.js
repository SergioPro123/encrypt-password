$(document).ready(function() {
    //Haga clic en cualquier lugar de la página para deshacerse de la ventana de lightbox
    $('#lightbox').click(function() { // debe usar live, ya que el elemento lightbox se inserta en el DOM
        $('#lightbox').hide();
    });

});


function trigq(event) {

    var image_href = $(event).attr("url");

    if ($('#lightbox').length > 0) { // #lightbox exists

        // coloca href como valor img src
        $('#content').html('<img src="' + image_href + '" />');

        //show lightbox window - you could use .show('fast') for a transition
        $('#lightbox').show();
    } else { //#lightbox does not exist - create and insert (runs 1st time only)

        //create HTML markup for lightbox window
        var lightbox =
            '<div id="lightbox">' +
            '<p>Click to close</p>' +
            '<div id="content">' + //insert clicked link's href into img src
            '<img src="' + image_href + '" />' +
            '</div>' +
            '</div>';

        //insert lightbox HTML into page
        $('body').append(lightbox);
    }
}

/*if ($('#lightbox').length > 0) { // #lightbox exists

    //insert img tag with clicked link's href as src value
    $('#content').html('<img src="' + image_href + '" />');

    //show lightbox window - you can use a transition here if you want, i.e. .show('fast')
    $('#lightbox').show();
}
else { //#lightbox does not exist

    //create HTML markup for lightbox window
    var lightbox =
        '<div id="lightbox">' +
        '<p>Click to close</p>' +
        '<div id="content">' + //insert clicked link's href into img src
        '<img src="' + image_href +'" />' +
        '</div>' +
        '</div>';

    //insert lightbox HTML into page
    $('body').append(lightbox);
}*/

/*$('#lightbox').live('click', function() {
    $('#lightbox').hide();
});*/