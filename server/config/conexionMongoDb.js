const mongoose = require('mongoose');
let conectarDB = async () => {
    await mongoose
        .connect(process.env.URLDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           /*  useCreateIndex: true, */
        })
        .then((msj) => {
            console.log('Conexion Exitosa a la base de datos');
        })
        .catch((err) => {
            console.log(err);
        });
    return;
};
conectarDB();
