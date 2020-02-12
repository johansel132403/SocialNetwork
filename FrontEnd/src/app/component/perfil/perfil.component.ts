import { Component, OnInit,DoCheck } from '@angular/core';
import { UsuarioServices } from '../../services/Usuario.services';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../../services/Global';
import { Follow } from '../../model/Follow.model';
import { FollowServices } from '../../services/Follows.services';
import { PublicationComponent } from '../publication/publication.component';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UsuarioServices,FollowServices,PublicationComponent]
})
export class PerfilComponent implements OnInit,DoCheck {

  public url;
  public identity;
  public token;
  public user;
  public status;
  public following;
  public followed;
  public stats;
  public follow;
  public getCountP;
  
  title = 'Perfil';
  constructor(
    private _UsuarioServices: UsuarioServices,
    private _router: Router,
    private _follow:FollowServices,
    private _route:ActivatedRoute,
    private _public: PublicationComponent
    
    ) {


    this.url = Global.url;
   }

  ngOnInit() {

    this.token = this._UsuarioServices.getToken();
    this.identity = this._UsuarioServices.getIdentity();
    this.stats = this._UsuarioServices.getCountPerfil();
    this.perfil();

    
  }

  ngDoCheck(){
    this.stats = this._UsuarioServices.getCountPerfil();
  }

  perfil(){
    let id;

    this._route.params.subscribe(
      params=>{
         id = params['id'];
        }
        
     )

        this.getperfil(id);
        this.getcounts(id);
     
  
  }

  getperfil(id){

    this._UsuarioServices.getOneUser(id).subscribe(
      response=>{

       
        if(response.response){
          this.user = response.response;

          // Este metodo lo llamamos desde la publicaciones para borrar el localstorage de page y ii ..
          this._public.clearVar(this.user._id);

        }else{
          this.status = 'Error..';
        }

        //Estos 2 if, es para el button de si nos siguen..
        if(response.following && response.following._id){
           this.following = true;
        }else{
          this.following = false;
        }

        if(response.followed && response.followed._id){
          this.followed = true;
        }else{
          this.followed = false;
        }
      },
      error=>{
        console.log(<any>error);
       //router.navigate
      }
    )
  }

  getcounts(id){

    this._UsuarioServices.getCount(id).subscribe(
      response=>{
        this.stats = response.response;
        localStorage.setItem('CountPerfil',JSON.stringify(response));
      },
      error=>{
        console.log(<any>error);
      }
    )

  }

  addFollow(userId){

    this.follow = new Follow('',this.identity,userId);

    this._follow.addFollow(this.follow).subscribe(
      response=>{

        this.following = true;

        this._UsuarioServices.getCount().subscribe(
          response=>{
            localStorage.setItem('count',JSON.stringify(response));



            this._UsuarioServices.getCount(userId).subscribe(
              response=>{
                localStorage.setItem('CountPerfil',JSON.stringify(response));
                
              },
              error=>{
                console.log(<any>error)
              }
            )
          },
          error=>{
            console.log(<any>error)
          }
        )

      },
      error=>{
        console.log(<any>error)
      }
    )
  }



  deleteFollow(userId){

    this._follow.deleteFollow(userId).subscribe(
      response=>{

        //Esto es para el count del usuario
        this._UsuarioServices.getCount().subscribe(
          response=>{
            
            localStorage.setItem('count',JSON.stringify(response));
          },
          error=>{
            console.log(<any>error)
          }
        )

       // Esto es para los contadores de los perfiles 
        this._UsuarioServices.getCount(userId).subscribe(
          response=>{
            localStorage.setItem('CountPerfil',JSON.stringify(response));
          },
          error=>{
            console.log(<any>error)
          }
          )
          this.following = false;

      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  public overButton;
// Estos son para podificar button..
  mouseEnter(userId){
     this.overButton = userId;
  }

  mouserLeave(){
    this.overButton = 0;
  }


}
