let revisarError = (err, res, data) => {
    if (err) {
        return res.json({
            ok: false,
            err
        });
    } else {
        return res.json({
            ok: true,
            data
        });
    }
};

module.exports = {
    revisarError
};