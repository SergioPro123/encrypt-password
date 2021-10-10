//-----------------------------------------
//        Configuramos el Puerto
//-----------------------------------------
process.env.PORT = process.env.PORT || 3000;

//-----------------------------------------
//               Entorno
//-----------------------------------------
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//-----------------------------------------
//      Configuramos la URL de MongoDB
//-----------------------------------------
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/chat';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

//-----------------------------------------
//            SEED para Tokens
//-----------------------------------------
process.env.SEED = process.env.SEED || 'SEED-DESARROLLO';

//-----------------------------------------
//           Caducidad para Tokens
//-----------------------------------------

process.env.CADUCIDAD_TOKEN = '48h';