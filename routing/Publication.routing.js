
let express = require('express');

let routing = express.Router();

let connetMultiparty = require('connect-multiparty');
let multiparty = connetMultiparty({uploadDir:'./upload/upload02'});

let middlewer = require('../Middlewer/authentication');

let controller = require('../Controllers/Publication.control');


routing.post('/savepublic',middlewer.Authentication,controller.savePublic);
routing.get('/getpublic/:page?',middlewer.Authentication,controller.getPublic);
routing.get('/getPubliPersonal/:id?/:page?',middlewer.Authentication,controller.getPublicP);
routing.get('/getOnlyP/:id',middlewer.Authentication,controller.getOnlyP);
routing.delete('/deleteP/:id',middlewer.Authentication,controller.deletePublic);

routing.post('/updateImagen/:id',[middlewer.Authentication,multiparty],controller.UpdateImagen);
routing.get('/getImg/:Imagen',controller.getImagen);






module.exports = routing;