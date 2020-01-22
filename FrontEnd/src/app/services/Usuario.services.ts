import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Usuario } from '../model/Usuarios.model';
import { Observable } from 'rxjs';
import { Global } from '../services/Global';


@Injectable()

export class UsuarioServices{

    public url: String;

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
}