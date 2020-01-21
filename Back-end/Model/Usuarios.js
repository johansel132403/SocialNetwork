var mongoose = require('mongoose');

 var schema = mongoose.Schema;
 
var Usuarios = schema({
     Nombre: String,
     SubName: String,
     Nick: String,
     Email: String,
     Password: String,
     Role: String,
     Imagen: String

});

module.exports = mongoose.model('Usuario',Usuarios);