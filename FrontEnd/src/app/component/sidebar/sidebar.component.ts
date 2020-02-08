import { Component, OnInit,DoCheck,Output,ViewChild,ElementRef,EventEmitter,Input, } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsuarioServices } from '../../services/Usuario.services';
import { Publicacion } from '../../model/Publicacion.model';
import { Global } from  '../../services/Global';
import { uploadImagen } from '../../services/uploadImagen.services';

import { PublicServices } from '../../services/Publication.services';





@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UsuarioServices,uploadImagen,PublicServices]

})
export class SidebarComponent implements OnInit,DoCheck {

  @ViewChild('inputFile',{static: false}) input :ElementRef;


  public url;
  public publicacion:Publicacion;
  public identity;
  public token;
  public status;
  public uploadFile: Array<File>;
  public stats;


  constructor(
   private _UsuariosServices: UsuarioServices,
   private _UploadImagen: uploadImagen,
   private _publicServices: PublicServices,
   private _roter: Router,
   private _route: ActivatedRoute
  ) { 

    this.stats = this._UsuariosServices.getStat();
    this.url = Global.url;
    this.identity = this._UsuariosServices.getIdentity();
    this.token = this._UsuariosServices.getToken();
    this.publicacion = new Publicacion('','','','',this.identity._id);
     
  }

  ngOnInit() {
    this.stats = this._UsuariosServices.getStat();
   
  }

  ngDoCheck(){
    this.stats = this._UsuariosServices.getStat();
  }



  resetCount(){
    this.stats = this._UsuariosServices.getStat();
  }


  onSubmit(form){
  
  

    this._publicServices.addPublication(this.publicacion,this.token).subscribe(
      response=>{
      
        if(response){

          if(this.uploadFile && this.uploadFile.length){

            
            this._UploadImagen.subirImagen(this.url+'updateImageen/'+response.publication._id,[],this.uploadFile,this.token,'Imagen')
            .then((value:any)=>{
              
              this.publicacion.Imagen = value.Imgen.Imagen;

              
              form.reset();
              this._roter.navigate(['/timeline']);
              this.sended.emit({status:'true'});
              //clear inputFile...
              document.querySelector<HTMLInputElement>("#uploadCaptureFile").value ='';

            });

          }else{
            this._roter.navigate(['/timeline']);
            form.reset();
          }


          this._UsuariosServices.getCount().subscribe(
            response=>{

              localStorage.setItem('count',JSON.stringify(response.response));
              this._roter.navigate(['/timeline']);
             
              this.sended.emit({status:'true'});

            },
            error=>{
              console.log(<any>error);
            }
          )


        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }


  @Output() sended = new EventEmitter();


  uploadImagenInput(inputFile:any){
          this.uploadFile = <Array<File>>inputFile.target.files;
  }

}
