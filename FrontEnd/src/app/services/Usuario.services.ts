import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../services/Global';
import { Usuario } from '../model/Usuarios.model';




@Injectable()

export class UsuarioServices{

    public url: String;
    public identity;
    public token;
    public count;
    public contPerfil;

        constructor(
            private _Http: HttpClient
        ){
            this.url = Global.url;
        }


     registrar(user: Usuario):Observable<any>{

        let params = JSON.stringify(user);

        let headers = new HttpHeaders().set('Content-type','application/json');

        return this._Http.post(this.url+'registrase',params,{headers:headers});

     } 

      
     getIdentity(){
         let identity = JSON.parse(localStorage.getItem('identity'));

         if(identity != 'undefined'){
            this.identity = identity;
         }else{
             this.identity = null;
         }

         return this.identity;
     }


     getToken(){
         let token = JSON.parse(localStorage.getItem('token'));

         if(token != null){
             this.token = token;
         }else{
             this.token = null;
         }
         return this.token;
     }
     

     login(user:Usuario,getToken = null):Observable<any>{


        if(getToken != null){
            user = Object.assign(user,{getToken});
        }

         let parmas = JSON.stringify(user);
         let headers = new  HttpHeaders().set('Content-type','application/json');

         return this._Http.post(this.url+'login',parmas,{headers:headers});                                
                                         
     }

     getUsersPage(page = null):Observable<any>{

        if(page == null){
            page = 1;
        }
         let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('authorization',this.getToken());

        return this._Http.get(this.url+'getUsuarion/'+page,{headers:headers});                               
    }


    getStat(){
        let count = JSON.parse(localStorage.getItem('count'));

        if(count != null){
           this.count = count;
        }else{
            this.count = null;
        }
        return this.count;
    }

    getCountPerfil(){
        let count = JSON.parse(localStorage.getItem('CountPerfil'));

        if(count != null){
            this.contPerfil = count;
        }else{
            this.contPerfil = null;
        }
        return this.contPerfil;
    }


    editUser(user:Usuario):Observable<any>{

        let params = JSON.stringify(user);

        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('authorization',this.getToken());
      
        return this._Http.put(this.url+'update/'+user._id,params,{headers: headers});                               

    }

    getOneUser(id):Observable<any>{

        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('authorization',this.getToken());

        return this._Http.get(this.url+'getUser/'+id,{headers:headers});                               
    }

    getCount(id = null):Observable<any>{

        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('authorization',this.getToken());

        if(id != null){
          
             
            return this._Http.get(this.url+'getCount/'+id,{headers:headers});                                 

        }else{
            return this._Http.get(this.url+'getCount',{headers:headers});   
        }                              
    }
}