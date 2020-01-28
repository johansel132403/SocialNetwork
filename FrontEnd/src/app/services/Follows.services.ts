import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Follow } from '../model/Follow.model';
import { Observable } from 'rxjs';
import { Global } from '../services/Global';
import { UsuarioServices } from '../services/Usuario.services';

@Injectable()

export class FollowServices{

    public token;
    public url;

       constructor(private _http: HttpClient,private _usuarioServices:UsuarioServices){

        this.url = Global.url;
       }

       getToken(){
            this.token =this._usuarioServices.getToken();
            return this.token;
       }

       addFollow(usersFollow:Follow):Observable<any>{

          let paramsUsers = JSON.stringify(usersFollow);

          let headers = new HttpHeaders().set('Content-type','application/json')
                                         .set('authorization',this.getToken());

          return this._http.post(this.url+'saveFollow',paramsUsers,{headers:headers});                               
       }

       deleteFollow(userId):Observable<any>{

         let id = userId;

         let headers = new HttpHeaders().set('Content-type','application/json')
                                        .set('authorization',this.getToken());
         
         return this._http.delete(this.url+'deleteFollow/'+id,{headers: headers})                                 
       }


}
