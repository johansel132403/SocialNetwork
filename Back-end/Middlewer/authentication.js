const jwt = require('jwt-simple');

const moment = require('moment');

const secret = 'Contrasena_que_no_se_puede_desifrar_por_nada';


exports.Authentication = function(req,res,next){

    if(!req.headers.authorization){
        return res.status(404).send({Mensaje: 'No esta autorizado, codigo 500, (Headers without auth)'});
    }
          
    var token = req.headers.authorization.replace(/['"]+/g,'');

    try{

        var payload = jwt.decode(token, secret);

        if(payload.fecha_expiracion <= moment().unix()){
            return res.status(200).send({Mensaje: 'El token a caducado'});
        }
    }catch(e){
         return res.status(400).send({Mensaje: 'El token no es valido'});
    }


    req.userp = payload;

    next();
}
