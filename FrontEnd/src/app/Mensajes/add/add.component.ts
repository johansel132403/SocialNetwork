import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FollowServices } from '../../services/Follows.services';
import { MensajesServices } from '../../services/Mensajes.services';
import { Global } from '../../services/Global';
import { Mensaje } from '../../model/Mensaje.model';
import { UsuarioServices } from '../../services/Usuario.services';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers:[FollowServices, MensajesServices, UsuarioServices]
})
export class AddComponent implements OnInit {

  public url;
  public mensajes:Mensaje;
  public identity;
  public token;
  public page;
  public pages;
  public next_page;
  public prev_page;
  public mensajesRes;
  public follow;
  

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
    this.mensajes = new Mensaje('','','',this.identity._id,'');
    this.page = 1;
   }



  ngOnInit() {
    this.getFollowThaFollowUs();
  }

  getFollowThaFollowUs(){
    this._followServices.getOwnFollow02().subscribe(
      response=>{

        this.follow = response.arrayId02;
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }


  onSubmit(form){
    console.log(this.mensajes);
    this._mensajes.addMensajes(this.mensajes,this.token).subscribe(
      response=>{
        console.log(response);
        form.reset();
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
}
