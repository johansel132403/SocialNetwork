import { Component, OnInit,DoCheck } from '@angular/core';
import { Publicacion } from '../../model/Publicacion.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../../services/Global';
import { uploadImagen } from '../../services/uploadImagen.services';
import { UsuarioServices } from '../../services/Usuario.services';
import { PublicServices } from '../../services/Publication.services';






declare var $: any;


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [UsuarioServices,PublicServices,uploadImagen]
})
export class TimelineComponent implements OnInit,DoCheck {

  public url;
  public Publication: Publicacion[];
  public token;
  public identity;
  public page;
  public pages;
  public total;

  constructor(
    private _UsuarioService: UsuarioServices,
    private _PublicServices: PublicServices,
    private _uploadImagen: uploadImagen,
    private _route: Router,
    private _roter: ActivatedRoute,
    
  ) {
    this.url = Global.url;
    this.identity = this._UsuarioService.getIdentity();
    this.token = this._UsuarioService.getToken();
    this.page = 1;
   }

  ngOnInit() {

    this.getPublic(this.page);

  }

  ngDoCheck(){

  }

   getPublic(page, edding = false){

    console.log('asi',page);

    this._PublicServices.getPublications(page,this.token).subscribe(
      response=>{

        this.total = response.total;
        this.pages = response.page;

       
          console.log('asdfasdf',response)
        
        if(!edding){
          this.Publication = response.Publication;
          
        }else{
          
          let arrA = this.Publication;
          
          let arrB = response.Publication;
          
          this.Publication = arrA.concat(arrB);
          
          console.log('df',this.Publication);

          $("html, body").animate({scrollTop: $('body').prop('scrollHeight')},500);
        }


      },
      error=>{
        console.log(<any>error);
      }
    )
   }

   public nmore = false;

   seeMore(){
     this.page += 1;
     if(this.page == this.pages){
       this.nmore = true;
     }
     this.getPublic(this.page,true);
   }

   refrez(event = null){                     // aqui le puse un null, por si da problema
   
    this.getPublic(1);
  }

  public ShowImagen;
  showImage(userId){

    console.log('-*-*',userId);
    this.ShowImagen = userId;

  }

  hideImagen(){
    this.ShowImagen =0;
  }


  borrarImagen(userId){

    this._PublicServices.deletePublic(userId,this.token).subscribe(
      response=>{

        console.log(response)

        this._UsuarioService.getCount().subscribe( 
          response=>{
            
            localStorage.setItem('count',JSON.stringify(response.response));
          //  this._sidebar.resetCount();
          },
          error=>{
            console.log(<any>error)
          }
        )
        this.refrez();

      },
      error=>{
        console.log(<any>error);
      }
    )

  }


}
