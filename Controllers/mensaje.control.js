let Mensaje = require('../Model/Mensajes');
let Folloe = require('../Model/Mensajes');
let moment = require('moment');
let paginate = require('mongoose-pagination');


let MensajeController = {

    //Este metodo es para guardar los mensaje..
    saveMensaje: function(req,res){

        let userId = req.userp.Sub;
        let body = req.body;

        let mensaje = new Mensaje();

        if(!body.Mensajes || !body.Receptor) return res.status(500).send({Mensaje:'Error hay campos vacios'});

        mensaje.Mensajes = body.Mensajes;
        mensaje.Men_Fecha = moment().unix();
        mensaje.viewed = 'false';
        mensaje.Emisor = userId;
        mensaje.Receptor = body.Receptor;


        mensaje.save((err,response)=>{

            if(err) return res.status(500).send({Mensaje:'Error codigo 500'});

            if(!response) return res.status(404).send({Mensaje:'Error codigo 404'});

            return res.status(200).send({Mensaje:response});
        });
    },


    //Recibir los mensajes enviados..

    getSendMessage: function(req,res){

        let userId = req.userp.Sub;
        let paramsId = req.params.id;

        let page = 1;

        if(req.params.page){
            page = req.params.page;
        }

        let itemPerPage = 4;

        Mensaje.find({'Receptor':userId}).sort('-Men_Fecha').populate('Receptor Emisor', 'Nombre Nick Imagen').paginate(page,itemPerPage,(err,response,total)=>{

            if(err) return res.status(404).send({Mensaje:'Error codigo 500'});

            if(!response) return res.status(400).send({Mensaje:'Error codigo 404'});

            return res.status(200).send({
                total,
                page: Math.ceil(total/itemPerPage),
                response
            
            });
        });
    },





    // Obtener los mensajes enviados..
    getMensajes: function(req,res){
        
        let userId = req.userp.Sub;
       


        let page = 1;

        if(req.params.page){
            page = req.params.page;
        }

        let itemPerPage = 4;

        Mensaje.find({'Emisor':userId}).sort('-Men_Fecha').populate('Emisor Receptor','Nombre Nick Imagen').paginate(page,itemPerPage,(err,response,total)=>{

            if(err) return res.status(500).send({Mensaje:'Error codigo 500'});

            if(!response) {
                return res.status(404).send({Mensaje:'Error Codigo 404'});
            }

            return res.status(200).send({
                total,
                page: Math.ceil(total/itemPerPage),
                response
            });
        });



    },


    getNoViewed: function(req,res){
        let userId = req.userp.Sub;

        Mensaje.count({'Receptor':userId, 'viewed': 'false'}).sort('-Men_Fecha').exec((err,response)=>{

            if(err) return res.status(404).send({Mensaje:'Error codigo 500'});

            if(!response) return res.status(500).send({Mensaje:'No hay mensajes Sin leer'});

            return res.status(200).send({view:response});
        });
    },

    putViewPositive: function(req,res){
        let userId = req.userp.Sub;

        Mensaje.update({'Receptor':userId, 'viewed': 'false'},{viewed:'true'},{multi:true},((err,response)=>{

            if(err) return res.status(500).send({Mensaje:'Error codigo 500'});

            if(!response) {
                return res.status(400).send({Mensaje:'Error No hay mensajes'});
            }

            return res.status(200).send({view:response});

        }));
    }

}
module.exports = MensajeController;


