var User = require('../Model/Usuarios');

var bcrypt = require('bcrypt-nodejs');

var jwt = require('jwt-simple');

var jwtToken = require('../Servises/jwt');

var paginaction = require('mongoose-pagination')

var fs = require('fs');
var path = require('path');

let controllers = {
    
    Home: function(req,res){
        
       res.status(200).send({
           Mensaje:'si todo esta bien !!'
       });
    },


// ESTE METODO ES PARA UN USUARIO REGISTRARSE
    Registrarse: function(req,res){

      

        var params = req.body;

        var user = new User();

        if(params.Nombre && params.SubName && params.Nick && params.Email && params.Password ){

            user.Nombre = params.Nombre;
            user.SubName = params.SubName;
            user.Nick = params.Nick;
            user.Email = params.Email;
            user.Role = 'Role_use';
            user.Imagen = null;

          User.find({$or:[

              {Email: user.Email},
              {Nick: user.Nick}

          ]}).exec((err,response)=>{

           // if(err) return res.status(500).send({Mensaje:'Error codigo 500'});

             if(response && response.length >= 1){

                var error = 'error';
                response.forEach((value)=>{
                    
                   if(value.Email.toLowerCase() == user.Email.toLowerCase()){
                     error = 'El Email ya esta registrado';
                   }

                   if(value.Nick.toLowerCase() == user.Nick.toLowerCase()){
                      error = 'Error El Nick ya esta en uso';
                   }

                });
                   return res.status(200).send({Mensaje:error});
             
             
             
                }else{


                    //AQUI ESTA EL BASH PARA LA CONTRASENA..
                bcrypt.hash(params.Password, null, null,(err, bash)=>{
                    user.Password = bash;

                    //Aqui guardamos los datos..

                    user.save((err,response)=>{
                       
                        if(err) return res.status(404).send({Mensaje:'Hay un error, No se pudo guardar los datos, codigo #500'});

                        if(response){

                            return res.status(200).send({Mensaje:response});
                        }else{
                            return res.status(404).send({Mensaje:'Hay un error, Codigo #404'});
                        }
                    });
                });


             }

          })
        }else{
            return res.status(404).send({Mensaje:'Hay Campos que esta vacios..'});
        }
    },




    //ESTE METODO ES PARA OBTENER UN USUARIO

    getUsuarios: function(req, res){

        var paramsId = req.params.id;

        User.findById(paramsId).select({"__v":0}).exec((error,response)=>{
            
            if(error) return res.status(500).send({Mensaje:'Error Codigo #500'});
            
            response.Password = undefined;
            return res.status(200).send({response});
        });

        //Aqui tenemos de obtener los follow para ver quienes no siguen y a quienes seguimos
    },


    //Obtener usuarios paginados..
    getMasUsuarios: function(req,res){
        
        var page = 1;

        if(req.params.page){
            page = req.params.page;
        }

        var itemPerPage = 4;

        User.find().sort('_id').select({'Password':0}).paginate(page,itemPerPage,(err,response,total) =>{

            if(err) return res.status(500).send({Mensajes:'Hay un error codigo 500'});

            if(!response) return res.status(404).send({Mensajes: 'Hay un error codigo 404'});



            //Aqui tambien tenemos que llamar a los metodos follow..
            


            return res.status(200).send({

                // resultado..
                response,
                total,
                page: Math.ceil(total/itemPerPage)

            });
        })
    },

    UpdateUsuario: function(req,res){

        var err;
        var paramsId = req.params.id;
        //Aqui se tiene que hacer una verificacion para ver de que no se actualize un usuario que no sea el 
        //que este registrado..
        
        console.log(paramsId);
        console.log(req.userp.Sub);
        if(paramsId != req.userp.Sub){
            return res.status(500).send({Mensaje:'No tienes permiso para actualizar este usuario.'});
        }
        
        var body = req.body;
        
        var user = new User();
        
        user.Email = body.Email;
        user.Nick = body.Nick;
        
        delete user.Password;
        
        var error = false;
        User.find({$or:[
            {Email: body.Email},
            {Nick: body.Nick}
        ]}).exec((err,response)=>{

            if(err) return res.status(500).send({Mensajes:'Error codigo 500'});


            response.forEach((value)=>{
            
                if(value && value._id != paramsId){

                    error = true;
                    if(value.Email.toLowerCase() ==  user.Email.toLowerCase()){
                      err = 'El Email ya esta en uso';
                    }
      
                    if(value.Nick.toLowerCase() ==  user.Nick.toLowerCase()){
                        err = 'El Nick ya esta registrado';
                    }
                }

           });

           if(error){
               return res.status(200).send({err});

           }
        
           User.findByIdAndUpdate(paramsId,body,{new:true},(err,response)=>{


            if(err) return res.status(500).send({Mensaje:'Error al actualizar, codigo 500'});


            if(!response) return res.status(404).send({Mensaje:"Error codigo 404"});


            return res.status(200).send({response});
           });

        });
    },

    login: function(req,res){

        const params = req.body;

        const Email = params.Email;
        const Password = params.Password;

        User.findOne({Email: Email}).exec((err,users)=>{

          if(err) return res.status(500).send({Mensaje:'Hay un error codigo #500'});

          if(users){

            //aqui hacemo la comparacion de las password sifrada
            bcrypt.compare(Password, users.Password,(err,response)=>{

                if(response){

                    console.log(users);
                     
                    //aqui lo que estamos haciendo es que no devulva un token cuando el token sea true,
                    // de lo contrario no devolvera los datos sin token..
                    if(params.getToken){
                         //aqui se devuelve el token..
                        return res.status(200).send({

                           token: jwtToken.crearToken(users)
                        });
                    }else{
                        response.Password = undefined;
                        res.status(200).send({users});
                    }

                }else{
                    return res.status(404).send({Mensaje: 'Error con la Password'});
                }
            });

          }else{
              return res.status(500).send({Mensaje:'Error este usuario No esta registrado'});
          }

        });
    },

    //uploadImagen
    uploadImagen: function(req,res){

        var paramsId = req.params.id;
        var userId = req.userp.Sub;

        if(req.files.Imagen){


            var file_path = req.files.Imagen.path;
            
            var file = file_path.split('\\');
            var file_name = file[file.length -1];
           

            var file_formato = file_name.split('\.');
            var formato = file_formato[file_formato.length -1];


            if(formato == 'png' || formato == 'PNG' || formato == 'GIF' || formato == 'gif' || formato == 'JPG' || formato == 'jpg' || formato == 'JPGE' || formato == 'jpge'){


                User.findByIdAndUpdate(paramsId,{Imagen: file_name},{new: true},(err,response)=>{
                    if(err)  return res.status(500).send({Mensaje:'Hay un error codigo 500'});

                    if(!response){
                        return controllers.BorrarArchivo(res, file_path, 'hay un error codigo 500');
                    }

                    return res.status(200).send({response});
                })
            }else{

                return controllers.BorrarArchivo(res,file_path, 'Error con el formato');
            }

        }else{
            return res.status(404).send({Mensaje:'Error de formato'});
        }
    },


   // Este metodo es para que borre todo los archivos no deseados..
    BorrarArchivo: function(res, file_path, mensaje) {
        fs.unlink(file_path,(err)=>{
            return res.status(200).send({Mensaje:mensaje});
        })
    },


   // Metodo para obtener las imagenes
    getImagen: function(req,res){

        var file_imagen = req.params.fileImagen;
        var file_path = './upload/'+file_imagen;


        console.log(file_path);

        fs.exists(file_path,(exist)=>{
             
            console.log(exist);
            if(exist){
               
                return res.sendFile(path.resolve(file_path));
            }else{
                return res.status(404).send({Mensaje:'La imagen No existe'});
            }
        });
    }






}

module.exports = controllers;