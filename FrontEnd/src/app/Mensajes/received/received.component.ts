import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FollowServices } from '../../services/Follows.services';
import { MensajesServices } from '../../services/Mensajes.services';
import { Global } from '../../services/Global';
import { Mensaje } from '../../model/Mensaje.model';
import { UsuarioServices } from '../../services/Usuario.services';


@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css'],
  providers:[FollowServices, MensajesServices, UsuarioServices]
})
export class ReceivedComponent implements OnInit {

  public url;
  public mensajes:Mensaje;
  public identity;
  public token;
  public page;
  public pages;
  public next_page;
  public prev_page;
  public mensajesRes;
  

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _usuarioServices: UsuarioServices,
    private _followServices: FollowServices,
    private _mensajes:MensajesServices
  ) {
    this.url = Global.url;
    this.identity = this._usuarioServices.getIdentity();
    this.token = this._usuarioServices.getToken();
   }

  ngOnInit() {
    this.getUpdatePage()
  }

  getUpdatePage(){
    
    this._route.params.subscribe(
      params=>{
       let page = +params['page'];

        if(!page){
          this.page  = 1
        }else{
          this.page = page;
        }      

        if(!params['page']){
          page = 1;
        }

        if(!page){
          page = 1;

        }else{
         this.next_page = page +1;
         this.prev_page = page -1;

         if(this.prev_page <=0){
           this.prev_page = 1;
         }

        }
         this.getSendMesaje(page);

      }
    )
  }

  getSendMesaje(page){

    this._mensajes.getMensaje(this.token,page).subscribe(
      response=>{
        this.mensajesRes = response.response;
        this.pages = response.page;
        console.log(this.mensajesRes);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
