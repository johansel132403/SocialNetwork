import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Global } from '../services/Global';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'  // <- ADD THIS
})


export class PublicServices{
    
    public url

    constructor(private _Http: HttpClient){
      this.url = Global.url;
    }

    addPublication(publicacion,token):Observable<any>{

        let params = JSON.stringify(publicacion);

        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('authorization',token);

        return this._Http.post(this.url+"savepublic",params,{headers:headers});                               
    }

    getPublications(page = 1, token):Observable<any>{
      
      

     let headers = new HttpHeaders().set('Content-type','application/json')
                                    .set('authorization',token);
     
     return this._Http.get(this.url+'getpublic/'+page,{headers:headers})                               
    }


    deletePublic(id,token):Observable<any>{

      let headers = new HttpHeaders().set('Content-type','application/json')
                                    .set('authorization',token);

      return this._Http.delete(this.url+'deleteP/'+id,{headers:headers})                              
    }

    getOwnPublication(id,page,token):Observable<any>{

      let headers = new HttpHeaders().set('Content-type','application/json')
                                     .set('authorization',token);

      return this._Http.get(this.url+'getPubliPersonal/'+id+'/'+page,{headers:headers});                               

    }
}