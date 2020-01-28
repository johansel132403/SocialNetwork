
var express = require('express');

var routing = express.Router();

var controller = require('../Controllers/usuario.control');

// esto es para la autorizacion
var middlewer = require('../Middlewer/authentication');

//archivos de imagen

var multiparty = require('connect-multiparty');
var _multiparty = multiparty({uploadDir:'./upload'});



    routing.get('/home',controller.Home);
    routing.post('/registrase',controller.Registrarse);
    routing.get('/getUser/:id',middlewer.Authentication,controller.getUsuarios);
    routing.get('/getUsuarion/:page?',middlewer.Authentication,controller.getMasUsuarios);
    routing.put('/update/:id',middlewer.Authentication,controller.UpdateUsuario);
    routing.post('/login',controller.login);
    routing.post('/uploadImagen/:id',[middlewer.Authentication,_multiparty],controller.uploadImagen);
    routing.get('/getImagen/:fileImagen',controller.getImagen);
    routing.get('/getCount/:id?',middlewer.Authentication,controller.getcout);




module.exports = routing;