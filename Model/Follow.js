var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Follow = Schema({
    Siguiendo: { type: Schema.ObjectId, ref: "Usuario"},
    Siguiendono: { type: Schema.ObjectId,ref: "Usuario"}
});

module.exports = mongoose.model('Follow',Follow);