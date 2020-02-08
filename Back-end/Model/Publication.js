var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Publication = Schema({

    Text: String,
    Text_fecha: String,
    Imagen: String,
    Usuario: {type: Schema.ObjectId, ref:'Usuario'}
});

module.exports = mongoose.model('Publicione',Publication);