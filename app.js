
let express  = require('express');


const bodyparse = require('body-parser');

var app = express();


//Cargar alchivos

var usuario_routing = require('./routing/Usuario.rauting');

//Middlewer
app.use(bodyparse.urlencoded({extended:false}));
app.use(bodyparse.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//RUTAS
app.use('/api',usuario_routing);

//IMPORTS

module.exports = app;
