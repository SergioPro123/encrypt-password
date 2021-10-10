require('./config/config');
require('./config/conexionMongoDb');

const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
//Helpers
require('./hbs/helpers');
//Express HBS engine
hbs.registerPartials(path.join(__dirname, '../', '/views/parciales'));
app.set('view engine', 'hbs');

//Configuracion global de rutas
app.use(require('./routes/index').app);

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
