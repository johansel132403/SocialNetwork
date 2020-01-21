
var Follow = require('../Model/Follow');
var paginate = require('mongoose-pagination');

var controllerFollow = {

//Este metodo es para guardar los followers
    sevaFollow: function(req,res){
       
        var follow = new Follow();

        let subId = req.userp.Sub;
        let params = req.params.followingUs;

        follow.Seguidor = subId;
        follow.Siguiendono =  params;
        
     /*   var erro;
        var error = false;
        
                                               //Este metodo es para no permitir de que se siga al mismo usuario
                                               //mas de una vez, pero de igual forma esto lo controlamos desde el Front-End
        
        Follow.find({$or:[
            
            {Seguidor:  follow.Seguidor}, 
            {Siguiendono:  follow.Siguiendono}

        ]}).exec((err,response)=>{
            
            if(response && response.length >= 1){
                response.forEach((value)=>{
                    
                  //  console.log('--', value.Seguidor);
                   console.log('si entro');

                    if(value && value.Seguidor ==  subId && value.Siguiendono == params){
                    
                     error = true;

                      erro = 'Ya se esta siguiendo a este usuario';
                    }
                });      
            }
            
            if(error){
                return  res.status(200).send({Mensaje:erro});
            });
            }*/

            follow.save((err,responsee)=>{
    
                if(err) return res.status(404).send({Mensaje:'Hay un error, No se pueder guardar'})
    
                if(!responsee) return res.status(404).send({Mensaje:'No se a podido guardar'});
    
                return res.status(200).send({responsee});
            });

        },

            //Este metodo el para eliminar los Follow..
            
            deleteFollow: function(req,res){
                
                let userId = req.userp.Sub;
                let paramsId = req.params.id;

                Follow.find({'Seguidor':userId, 'Siguiendono':paramsId}).remove((err,response)=>{

                    if(err) return res.status(400).send({Mensaje:'Error codigo 400, NO se pudo eliminar el (Follow)'});

                    if(!response)  return res.status(404).send({Mensaje:'No se pudo elimanar el follow, hay un error'});

                    return res.status(200).send({Mensaje:'Se a borrado el Follow exitosamente'});
                });
            },

            //Este metodo es para listarno los usuarios que seguimos 

            getFollowers: function(req,res){

                let userId = req.userp.Sub;

                    if(req.params.id && req.params.page){
                        userId = req.params.id;
                    }

                    let page = 1;
                    if(req.params.page){
                        page = req.params.page;
                    }

                let itemsPerPage = 4;

                Follow.find({'Seguidor':userId}).populate('Siguiendono', 'Nombre Nick _id Imagen').paginate(page,itemsPerPage,(err,response,total)=>{

                    if(err) return res.status(404).send({Mensaje: 'hay un error..'})

                    if(!response){
                        return res.status(404).send({Mensaje:'Error, No se puede obtener Seguidores'});
                    }

                    controllerFollow.followUsers(req.userp.Sub).then((value)=>{
                    
                        return res.status(200).send({
                            total,
                            page: Math.ceil(total/itemsPerPage),
                            Seguidores: response,
                            // Aqui necesitamos ver las personas que seguimos y nos siguen ... SOLO ID.. 
                            Sigueindo: value.Siguiendo,
                            Siguiendono:value.Siguiendono
                            
                        });

                    });
                })
            },

              /// Este metodo nos devuelve un listado de los que seguimos y nos siguen...
            followUsers: async function(userId){

                try{
                  var Siguiendo = await Follow.find({'Seguidor':userId}).exec().then((response)=>{
                          
                        var SiguiendoArray = [];

                        response.forEach((value)=>{
                            SiguiendoArray.push(value.Siguiendono);
                        });                         
                             return SiguiendoArray;
                        });

                  var Siguiendono = await Follow.find({'Siguiendono':userId}).exec().then((response)=>{

                        var SiguiendonoArray = [];

                        response.forEach((value)=>{
                            SiguiendonoArray.push(value.Seguidor);
                        });
                            
                             return SiguiendonoArray;
                        });

                        return {
                            Siguiendo:Siguiendo,
                            Siguiendono: Siguiendono
                        }

                }
                catch(e){
                   console.log(e);
                };

            },

            //Este metodo es para obtener los seguidores de una forma mas especifica ..

            getUsFollow: function(req,res){
                let userId = req.userp.Sub;
                let paramsId = req.params.id;
                

                if(paramsId && req.params.page){
                    userId = req.params.id;
                }

                let page = 1;

                if(req.params.page){
                    page = req.params.page;
                }

                let itemPerPage = 4;

                Follow.find({'Siguiendono':userId}).sort().populate('Seguidor','Nombre Nick Imagen Role ').select({'__v':0}).paginate(page,itemPerPage,(err,response,total)=>{

                    if(err) return res.status(404).send({Mensaje:'Error No se puede tener Follow..'});

                    if(!response) {
                        return res.status(404).send({Mensaje:'Error codigo 404'});

                    }

                    controllerFollow.followUsers(userId).then((value)=>{

                        return res.status(200).send({
                            page: Math.ceil(total/itemPerPage),
                            total,
                            response,
                            Siguiendono: value.Siguiendono,
                            Siguiendo: value.Siguiendo
                        });
                    });
                });
            },

                //Obtener los follow sin paginacion .. 

               getFollowWithOutPag: function(req,res){

                        let userId = req.userp.Sub;
                        // De esta forma busco a todo lo que sigo..
                        let find = Follow.find({'Seguidor':userId});

                        //De esta forma busco a todos lo que me siguen..
                        if(req.params.follow){
                            find = Follow.find({'Siguiendono':userId});
                        }

                        find.populate('Seguidor Siguiendono').exec((err,response)=>{

                            if(err) return res.status(404).send({Mensajes: 'Error codigo 404'});

                            if(!response){
                                return res.status(404).send({Mensajes:'Error no se puede obtener nada'});
                            }

                            return res.status(200).send({response});
                        });
            }
}

module.exports = controllerFollow; 


