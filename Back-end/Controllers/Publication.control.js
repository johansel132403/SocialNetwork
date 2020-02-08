
let Publication = require('../Model/Publication');
let paginate = require('mongoose-pagination');
let moment = require('moment');

let Follow = require('../Model/Follow');

let fs = require('fs');
let path = require('path');


let Publicaciones = {

// aqui cambiel la variable del mode FileImagen por Imagen
    savePublic: function(req,res){
        let userId = req.userp.Sub;
        let body = req.body;

        if(!body.Text) return res.status(500).send({Mensaje:'Hay un error, No hay TEXTO..'});

        let public = new Publication();

        public.Text = body.Text;
        public.Text_fecha =  moment().unix();
        public.Imagen = null;
        public.Usuario = userId;

        public.save((err,response)=>{

            if(err) return res.status(500).send({Mensaje:'Error al guardar'});

            if(!response) res.status(404).send({Mensaje:'Error no hay publicacion..'});

            return res.status(200).send({publication: response});
        });

    },


    //Obtener las publicaciones de los usuarios que seguimos y nuestra publicacion..
    getPublic: function(req,res){

        let userId = req.userp.Sub;
        let params = req.params.id;

        let page = 1;

        if(req.params.page){
            page = req.params.page;
        }

        let itemPerPage = 4;

       Follow.find({'Seguidor':userId}).populate('Siguiendono').exec((err,response)=>{

          if(err) return res.status(500).send({Mensaje:'Error codigo 500'});

          if(!response) return res.status(404).send({Mensaje:'Error codigo 404'});

          let publicArray = [];

          response.forEach((value)=>{

            publicArray.push(value.Siguiendono);

          });

          // Nuestro ID lo insertamos tambien en el array paara que aparescan las publicaciones mia y la de los usuarios que sigo..
          publicArray.push(req.userp.Sub);


          Publication.find({Usuario: {"$in": publicArray}}).select({'__v':0}).sort('-Text_fecha').populate('Usuario','Nombre Nick SubName Imagen').paginate(page,itemPerPage,(err,response,total)=>{

            if(err) return res.status(404).send({Mensaje:'Hay un error codigo 500'});

            if(!response) return  res.status(404).send({Mensaje:'Error codigo 404'});

            return res.status(200).send({
                total,
                page: Math.ceil(total/itemPerPage),
                Publication: response
            
            });
          });
       });
       

    },

    getPublicP: function(req,res){

        let userId = req.userp.Sub;
        let paramsId = req.params.id;

        let page = 1;


        if(req.params.page){
            page = req.params.page;
        }

        if(req.params.id){
            userId = req.params.id;
        }

        let itemPerPage = 4;

        Publication.find({'Usuario':userId}).sort('-Text_fecha').populate('Usuario').paginate(page,itemPerPage,(err,response,total)=>{

            if(err) return res.status(500).send({Mensaje:'Error codigo 500'});

            if(!response) return res.status(404).send({Mensaje}).send({Mensaje:'Error codigo 404'});

            return res.status(200).send({
               total,
               page: Math.ceil(total/itemPerPage),
               response

            });
        });
    },

    //Este metodo es para obtener una publicacion en especifico..
    getOnlyP: function(req,res){

        let userId = req.params.id;
        
        Publication.findById(userId,(err,response)=>{

            if(err) return res.status(505).send({Mensaje:'Error codigo 500'});

            if(!response) return res.status(404).send({Mensaje:'ERROR: No hay publicacion'});

            return res.status(200).send({Publication:response});
        });
    },

    //Metodo para borrar publicacion..
    deletePublic: function(req,res){
      
        let paramsId = req.params.id;
        
        Publication.find({'Usuario':req.userp.Sub, '_id':paramsId}).remove((err,response)=>{
            console.log(response); 
            
            
            if(err) return res.status(500).send({Mensaje:'Error codigo 404'});
            
            if(response.deletedCount == 0) return res.status(404).send({Mensaje:'Error: No se puede eliminar la publicacion..'});
            
            return res.status(200).send({Mensaje:'Publicacion eliminada'});
        });

    
    },
    
    algolo(){

        //esto lo estoy haciendo yo tratando de ver como se puede actualizar la base de dato cuando una colletion se aya actualizado 
        //estamos viendo con el strigger o Change Streams, ( cuando borramos a un perfil que la actualizacion la pueda ver el perfil que se a borrado).....
        
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect("mongodb://localhost:27017/Social-Network")
         .then(function(client){
           let db = client.db('Social-Network')
    
           let change_streams = db.collection('Publication').watch().forEach(printBlock)
             
                  console.log(printBlock)
              
          });
      
    },

   



     // Metodo para subir foto..

     UpdateImagen: function(req,res){

         
         
         
         
         if(req.files.Imagen){
           
   
            let paramsId =req.params.id;
         
            let  file_path = req.files.Imagen.path;
            let file_split = file_path.split('\\');
            let file_name = file_split[file_split.length -1];

            let file_format = file_name.split('\.');
            let formato = file_format[file_format.length -1];


            console.log(file_name);

            if(formato == 'PNG' || formato == 'png' || formato == 'GIF'|| formato == 'gif'|| formato == 'JPG' || formato == 'jpg'|| formato == 'jpeg' || formato == 'JPEG'){

                Publication.findOne({Usuario:req.userp.Sub, _id:paramsId}).exec((err,response)=>{
                    
                    if(err) return res.status(500).send({Mensaje:'Error codigo 500'});

                   
                    if(response){

                        Publication.findByIdAndUpdate(paramsId,{Imagen:file_name}, {new:true},(err,response)=>{
                            
                            if(err) return res.status(500).send({Mensaje:'Error codigo 500'});

                            if(!response){
                                return Publication.eliminarImagenNoDeseada(res,file_path,'Error codigo 500');
                            }

                            return res.status(200).send({Imgen:response});
                        });

                    }else{
                        return res.status(404).send({Mensaje:'Error No se puede subir la imagen..'})
                    }
                });
            }else{
              return   Publicaciones.eliminarImagenNoDeseada(res,file_path,'Error No se puede subir este formato');
            }


        }else{
            return res.status(500).send({Mensaje:'Error No hay imagen'});
        }
     },


     //Esto no permite que formatos NO deseados se agreguen..
     eliminarImagenNoDeseada: function(res,file_path,mensaje){

        fs.unlink(file_path,(err)=>{
           res.status(404).send({response:mensaje});
        });

     },


     //Este metodo es para obtener la imagen..
     getImagen: function(req,res){

        let file = req.params.Imagen;
        
        let file_name = './upload/upload02/'+file;

           
        fs.exists(file_name,(exists)=>{
            if(exists){

                return res.sendFile(path.resolve(file_name));

            }else{
                return res.status(404).send({Mensaje:'error'})
            }

        });

     }




}
module.exports = Publicaciones;
