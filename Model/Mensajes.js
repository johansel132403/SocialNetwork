var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Mensajes = Schema({

Mensajes: String,
Men_Fecha: String,
Emisor: {type: Schema.ObjectId, ref:'Usuario'},
Reseptor: { type: Schema.ObjectId,ref:'Usuario'}

});

module.exports = mongoose.model('Mensaje',Mensajes);