function notify(msj) {
    $.notify({
        // custom notification message
        message: msj,

        // 'default', 'info', 'error', 'warning', 'success'
        status: 'error',

        // timeout in ms
        timeout: 5000,

        // 'top-center','top-right', 'bottom-right', 'bottom-center', 'bottom-left'
        pos: 'top-right',

        // z-index style for alert container
        zIndex: 3000,

        // Function to call on alert close
        onClose: function () {},
    });
}
