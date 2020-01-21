
    var jwt = require('jwt-simple');
    var moment = require('moment');
    const secret = 'Contrasena_que_no_se_puede_desifrar_por_nada';


    exports.crearToken = function(user){
    
    var payload = {
        Sub: user._id,
        Nombre: user.Nombre,
        SubName: user.SubName,
        Nick: user.Nick,
        Email: user.Email,
        Role: user.Role,
        image: user.image,
        fecha_creada: moment().unix(),
        fecha_expiracion: moment().add(30,'day').unix()

    };

    return jwt.encode( payload, secret );
}