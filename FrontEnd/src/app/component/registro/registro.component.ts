import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/Global';
import { UsuarioServices } from '../../services/Usuario.services';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Usuario } from 'src/app/model/Usuarios.model';

//Import para la imagen

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioServices]
})
export class RegistroComponent implements OnInit {

  public url: String;
  public user: Usuario;
  public status;
  public statuss;
  
  constructor(
    private _UsuarioService: UsuarioServices,
    private _router: Router,
    private _ActivatedRoute: ActivatedRoute
    ) {
      
      this.user = new Usuario('','','','','','','Role_user','');
      this.url = Global.url;
    }
    
    ngOnInit() {
    }
    
    onSumit(form){
      
      this._UsuarioService.registrar(this.user).subscribe(
        response=>{
        
          if(response.Registro && response.Registro._id ){
            
             this.status = "true";
             this.statuss = 'EN HORA BUENA! YA ESTAS REGISTRADO';

              setTimeout(()=>{
              
                this.status = null;
                
              },2700);

              form.reset();
          }else{

             this.statuss = response.Mensaje;
             this.status = 'false'
          }
      },

      error =>{
        console.log(<any>error);
      }

      )
      
  }

}
