import { Injectable } from '@angular/core';
import { UsuarioServices } from '../services/Usuario.services';
import { Router,CanActivate } from '@angular/router';

@Injectable()


// Este metodo lo que nos ayuda es que si no estamos login no podemos entrar por la Url a ningunas de las pestanas...
export class SaveServices{

    constructor(
        private _UserServices: UsuarioServices,
        private _router: Router
        ){

    }

 

    canActivate(){

        let identity = this._UserServices.getIdentity();

        if(identity && (identity.Role == 'Role_use')){

            return true;
        }else{
            
            this._router.navigate(['/login']);
            return false;
        }
    }
}
