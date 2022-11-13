//Conecta mi servidor web con la base de datos en mongodb
//En caso de fallar aroja un mensaje de error a la consola

const mongoose = require('mongoose');
const {mongodb} = require('./keys');
 mongoose.connect(mongodb.URI,{})
    .then(db => console.log('La base de datos esta conectada'))
    .catch(err => console.error(err));