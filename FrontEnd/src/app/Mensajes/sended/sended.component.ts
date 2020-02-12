import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsuarioServices } from '../../services/Usuario.services';
import { Global } from '../../services/Global';
import { MensajesServices } from '../../services/Mensajes.services';
import { Mensaje } from '../../model/Mensaje.model';

@Component({
  selector: 'app-sended',
  templateUrl: './sended.component.html',
  styleUrls: ['./sended.component.css'],
  providers:[UsuarioServices,MensajesServices]
})
export class SendedComponent implements OnInit {

  public url;
  public identity;
  public token;
  public page;
  public pages;
  public next_page;
  public prev_page;
  public mensaje: Mensaje;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _UsuariosServices: UsuarioServices,
    private _MensajesServices: MensajesServices
  ) { 

    this.url = Global.url;
    this.identity = this._UsuariosServices.getIdentity();
    this.token = this._UsuariosServices.getToken();

  }

  ngOnInit() {
    this.getPege()
  }

  getPege(){
    this._route.params.subscribe(
      params=>{
        let page = +params['page']

        if(!page){
          this.page = 1
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


        }
        this.getOwmMesajes(page);

      }
    )
  }

  getOwmMesajes(page){

    this._MensajesServices.getOwnMensaje(page,this.token).subscribe(
      response=>{

        this.mensaje = response.response;
        this.pages = response.page;
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
