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

       getFollowed(id,page):Observable<any>{

         let headers = new HttpHeaders().set('Content-type','application/json')
                                        .set('authorization',this.getToken());

          return this._http.get(this.url+'getUsFollow/'+id+'/'+page,{headers:headers});                               


       }

       getOwnFollow(follow = false):Observable<any>{

         

         let headers = new HttpHeaders().set('Content-type','application/json')
                                        .set('authorization',this.getToken());
        
         return this._http.get(this.url+'getOnlyFollow',{headers: headers});                               

      }

      getOwnFollow02(follow = true):Observable<any>{

         

         let headers = new HttpHeaders().set('Content-type','application/json')
                                        .set('authorization',this.getToken());
        
         return this._http.get(this.url+'getOnlyFollow/'+follow,{headers: headers});                               

      }

      getUsFollow(userId,page = null):Observable<any>{

         if(!page){
            page = 1;
         }

         let headers = new HttpHeaders().set('Content-type','application/json')
                                        .set('authorization',this.getToken());

         return this._http.get(this.url+'getFollow/'+userId+'/'+page,{headers:headers});                               
         
      }


}
