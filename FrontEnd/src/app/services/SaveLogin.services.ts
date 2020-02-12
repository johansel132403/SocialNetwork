import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';
import { UsuarioServices } from './Usuario.services';


@Injectable()


export class SaveLogin{
    constructor(
        private _router:Router,
        private _Usuario:UsuarioServices
        ){


    }
 // En este caso lo que estamos haciendo aqui es de que cuando el usuario este loginado en la pagina 
 // y navegando en ella no pueda volver otra vez al login por que ya esta logiado, entonce lo que estamos haciendo es dirigiendolo al  home 
    canActivate(){
        //este GetIdentity viene del Usuario..
        let identity = this._Usuario.getIdentity();

        
        if(identity && (identity.Role == 'Role_use')){


             this._router.navigate(['/home']);
             return false;

        }else{
            return true;
        }

    }
}