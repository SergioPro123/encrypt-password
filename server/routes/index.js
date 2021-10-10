const express = require('express');
const app = express();

app.use(require('./login').app);
app.use(require('./register').app);
app.use(require('./usuario').app);

module.exports = {
    app,
};
