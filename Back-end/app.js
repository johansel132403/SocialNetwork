
let express  = require('express');


var app = express();
const bodyparse = require('body-parser');



//Cargar alchivos

var usuario_routing = require('./routing/Usuario.rauting');
var follow_routing = require('./routing/Follow.routing');
var publication_routing = require('./routing/Publication.routing');
var message_routing = require('./routing/Mensaje.routing');

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
app.use('/api',follow_routing);
app.use('/api',publication_routing);
app.use('/api',message_routing);

//IMPORTS

module.exports = app;
