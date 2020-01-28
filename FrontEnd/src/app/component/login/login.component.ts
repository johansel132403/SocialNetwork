import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsuarioServices } from '../../services/Usuario.services';
import { Usuario } from '../../model/Usuarios.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioServices]
})
export class LoginComponent implements OnInit {

  public user: Usuario;
  public error;
  public status;
  public identity;
  public token;
 
  

  constructor(
    private _UsuarioServis: UsuarioServices,
    private _router: Router,
    private __route: ActivatedRoute
  ) {

    this.user = new Usuario('','','','','','','Role_user','');
   }

  ngOnInit() {
  }

  onSubmit(form){
    
   
     this._UsuarioServis.login(this.user).subscribe(
       response=>{

         
         this.identity = response.users;
         localStorage.setItem('identity',JSON.stringify(this.identity));
         this.getTokenUser(form);

       },
       err=>{
        
         this.status = "error";
         this.error = err.error.Mensaje;

       }
     )
  }

  getTokenUser(form){

    this._UsuarioServis.login(this.user,'true').subscribe(
      response=>{
               this.token = response.token;
               localStorage.setItem('token',JSON.stringify(this.token));

      },
      error=>{
         console.log(<any>error)
      }
    )
     
    form.reset();
    this._router.navigate(['/timeline']);

    // aqui hay que consegui los counts 
  }

}
