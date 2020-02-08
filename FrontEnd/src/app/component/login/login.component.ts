import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsuarioServices } from '../../services/Usuario.services';
import { Usuario } from '../../model/Usuarios.model';
import { TimelineComponent } from '../timeline/timeline.component';
import { uploadImagen } from '../../services/uploadImagen.services';
import { PublicServices } from '../../services/Publication.services';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioServices,TimelineComponent,PublicServices,uploadImagen,SidebarComponent ]
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
    private _time:TimelineComponent,
    private _publi:PublicServices,
   
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
          
          this.getCountt();
        },
        error=>{
          console.log(<any>error)
        }
        )
        
        form.reset();
        
      }
      
      
      
      getCountt(){
        this._UsuarioServis.getCount().subscribe(
          response=>{
            
            
            localStorage.setItem('count',JSON.stringify(response.response));
            this._time.getPublic(1);
            
          },
          error=>{
            console.log(<any>error);
          }
          )
          
          this._router.navigate(['/timeline']);
  }
}
