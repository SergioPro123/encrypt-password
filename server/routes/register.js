const express = require('express');
const app = express();

app.get('/register', (req, res) => {
    res.render('register.hbs');
});

module.exports = {
    app
};