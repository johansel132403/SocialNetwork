import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsuarioServices } from '../../services/Usuario.services';
import { Usuario } from '../../model/Usuarios.model';
import { Global } from '../../services/Global';
import { uploadImagen } from '../../services/uploadImagen.services';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UsuarioServices,uploadImagen]
})
export class EditComponent implements OnInit {

  public url;
  public user:Usuario;
  public token;
  public status;
  public FileUpload: Array<File>;


  constructor(
    private _UsuariosServices: UsuarioServices,
    private _uploadImagen: uploadImagen,
    private _route: Router,
    private _router: ActivatedRoute

  ) { 

    this.url = Global.url;
    this.user = this._UsuariosServices.getIdentity();
    this.token = this._UsuariosServices.getToken();

  }

  ngOnInit() {
  }

  onSubmit(){

    this._UsuariosServices.editUser(this.user).subscribe(
      response=>{

        console.log(response);
        if(!response.response){
          this.status = 'Error..';
        }else{
          this.status = 'succes';
          localStorage.setItem('identity',JSON.stringify(this.user));


          // Actualizar imagen..
          this._uploadImagen.subirImagen(this.url+'uploadImagen/'+this.user._id,[],this.FileUpload,this.token,'Imagen')
                            .then((value:any)=>{
                            
                               this.user.Imagen = value.response.Imagen;
                               localStorage.setItem('identity',JSON.stringify(this.user));
                            })
                            
 
        }

      },
      error=>{
        console.log(<any>error);
      }
    )
   

  }

  IploadFile(inputFile:any){
    console.log(inputFile.target.files);

    this.FileUpload = <Array<File>>inputFile.target.files;

  }

}
