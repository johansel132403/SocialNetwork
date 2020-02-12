import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Mensaje } from '../model/Mensaje.model';

import { Global } from '../services/Global';

@Injectable()



export class MensajesServices{

    public url;
    

    constructor(private _http: HttpClient){
    this.url = Global.url;
    }

    addMensajes(mensaje:Mensaje,token):Observable<any>{

        let params = JSON.stringify(mensaje);

        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('authorization',token);
        
        return  this._http.post(this.url+'savemenssage',params,{headers:headers});                               
    }      
    
    //Aqui obtenemos los mensajes enviados....
    getMensaje(token,page = 1):Observable<any>{

       

        let headers = new HttpHeaders().set('Content-type','applicatoin/json')
                                       .set('authorization',token);

        return this._http.get(this.url+'getsendm/'+page,{headers:headers});                               

    }


    //Obtener los mensajes que hemos enviados..
    getOwnMensaje(page = 1, token):Observable<any>{

        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('authorization',token);

         return this._http.get(this.url+'getownmensaje/'+page,{headers:headers})                                

    }

    

}