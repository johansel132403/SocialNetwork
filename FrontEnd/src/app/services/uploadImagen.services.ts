import { Injectable } from '@angular/core';
import { Global } from '../services/Global';

@Injectable()

export class uploadImagen{
    public url;

    constructor(){
        this.url = Global.url;
    }

    subirImagen(url:string, params:Array<string>,files:Array<File>,token:string,name:string){

        return new Promise((resolve,reject)=>{

            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0; i <files.length; i++){
                formData.append(name, files[i],  files[i].name);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }
              xhr.open('POST',url,true);
                                  
              xhr.setRequestHeader('authorization',token);

              xhr.send(formData);
        });
    }
}
