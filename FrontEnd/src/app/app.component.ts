import { Component,OnInit,DoCheck } from '@angular/core';
import { UsuarioServices } from './services/Usuario.services';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioServices]
})
export class AppComponent implements OnInit, DoCheck{
       
       public title =  'SocialNetwork';
       public identity;

       constructor(

        private _UsuarioUser: UsuarioServices){
           
        }

        ngOnInit(){
          this.identity = this._UsuarioUser.getIdentity();
        }


        ngDoCheck(){
          this.identity = this._UsuarioUser.getIdentity();
        }


        logout(){
          localStorage.clear();
          this.identity = null;
        }

}
