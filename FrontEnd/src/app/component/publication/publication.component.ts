import { Component, OnInit,DoCheck,Input } from '@angular/core';
import { PublicServices } from '../../services/Publication.services';
import { Router,ActivatedRoute,Params } from '@angular/router'; 
import { Global } from '../../services/Global';

import { UsuarioServices } from '../../services/Usuario.services';
import { Publicacion } from '../../model/Publicacion.model';

declare var $:any;

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css'],
  providers:[PublicServices,UsuarioServices]
})
export class PublicationComponent implements OnInit {

  public url;
  public publicacion: Publicacion[];
  public identity;
  public token;
  public page;
  public pages;
  
  //RECIBE UN ID DESDE EL PERFIL..
  @Input() userId: String

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _public: PublicServices,
    private _userServices: UsuarioServices
  ) {

    this.url = Global.url;
    this.token = this._userServices.getToken();
    this.identity = this._userServices.getIdentity();
  }
  
  ngOnInit() {
    this.page = 1;
    this.getPublicacionPersonal(this.userId,this.page);
   
  }
  
  ngDoCheck(){ 
    
    this.publicacion = JSON.parse(localStorage.getItem('public'));
    this.page = JSON.parse(localStorage.getItem('page'));
    
    this.ii = JSON.parse(localStorage.getItem('ii'));
    
  }
  
  getPublicacionPersonal(id,page,edding = false){
   
    this._public.getOwnPublication(id, page,this.token).subscribe(
      response=>{
        
          
        this.pages = response.page;
        
        if(!edding){
          this.publicacion = response.response;
          
        }else{

          var arrayA = this.publicacion;

          var arrayB = response.response;

          this.publicacion = arrayA.concat(arrayB);

          $('html,body').animate({scrollTop:$('body').prop("scrollHeight")});
        }

         localStorage.setItem('public',JSON.stringify(this.publicacion));
      },
      error=>{
        console.log(<any>error);
      }
    )

  }

  clearVar(userId){

    localStorage.removeItem('ii');
    localStorage.removeItem('page');

    
    this.getPublicacionPersonal(userId,this.page);

  }

  public nmore = false;
  public ii = 1;
  seeMore(value){

    this.ii += 1;
    this.page = this.ii + 1;
    localStorage.setItem('ii',JSON.stringify(this.ii));

    if(this.page == this.pages){
      this.nmore = true;
    }

    localStorage.setItem('page',JSON.stringify(this.page));
    this.getPublicacionPersonal(this.userId,this.page,true);
  }

}
