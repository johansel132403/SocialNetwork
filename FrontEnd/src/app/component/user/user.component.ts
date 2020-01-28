import { Component, OnInit,DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioServices } from '../../services/Usuario.services';
import { Global } from '../../services/Global';
import { Usuario } from '../../model/Usuarios.model';
import { FollowServices } from '../../services/Follows.services';
import { Follow } from 'src/app/model/Follow.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UsuarioServices,FollowServices]
})
export class UserComponent implements OnInit,DoCheck {

  public identity;
  public url;
  public token;
  public user: Usuario[];
  public status;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;
  public following;
  public follow;
  public statusError;
  

  constructor(
     
     private _UsuarioServices: UsuarioServices,
     private _router: Router,
     private _route: ActivatedRoute,
     private _FollowServices: FollowServices
  ) {
    this.url = Global.url;
   }

  ngOnInit() {

    
    
    this.identity = this._UsuarioServices.getIdentity();

    this.actualpage();

    
  }
  ngDoCheck(){



  }
  
  
  actualpage(){
    
    this._route.params.subscribe(
      params=>{

        let page = +params['page'];
            this.page = page;

         if(!params['page']){
           page = 1;
         }

         if(!page){
           page = 1;
          }

          this.next_page = page+1;
          this.prev_page =page-1;

        if(this.prev_page <= 0){
           this.prev_page = 1;
        }
           this.getusersss(page);
        }
        
        );
        
    }
    
    getusersss(page){

      let d;
      
      this._UsuarioServices.getUsersPage(page).subscribe(
        response=>{

          if(!response.usuarios){
            
            this.statusError = 'Error..';
          }else{

            this.user = response.usuarios;
            this.following = response.following;
            console.log(this.user);
            this.pages = response.page;

            if(page > this.pages){
              this._router.navigate(['/gente',1]);
            }
          }
          
          
      },
          error=>{
             console.log(error);
             var mensajeerror = <any>error;

             if(mensajeerror != null){
               this.status = 'Error';
             }
        }
    );

  }

  mouseEnter(userId){
      this.follow = userId;
  }
  mouseLeave(userId){

      this.follow = 0;
  }


  addFollow(followId){

    let follo = new Follow('',this.identity,followId);

    this._FollowServices.addFollow(follo).subscribe(
       response=>{

        if(response){
          this.following.push(followId);
          
        }

      },
       error=>{
         console.log(<any>error)
       }
    );

  }

  deleteFollow(userId){

    this._FollowServices.deleteFollow(userId).subscribe(
      response=>{

        let id = this.following.indexOf(userId);
       
        if(id != -1){
         
          this.following.splice(id,1);

          console.log(id);

          //Aqui tiene que ir un count.....
          
        }
       
      },
      error=>{
        console.log(<any>error);
      }
    );

  }


























}
