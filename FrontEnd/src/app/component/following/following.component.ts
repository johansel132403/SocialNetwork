import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FollowServices } from '../../services/Follows.services';
import { UsuarioServices  } from '../../services/Usuario.services';
import { Global } from '../../services/Global';
import { Follow } from '../../model/Follow.model'; 
import { SidebarComponent } from '../sidebar/sidebar.component';
import { uploadImagen } from '../../services/uploadImagen.services';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
  providers: [FollowServices,UsuarioServices,SidebarComponent,uploadImagen]

})
export class FollowingComponent implements OnInit {

  public Follow: Follow;
  public status;
  public identity;
  public token;
  public followed;
  public following;
  public url;
  public pages;
  public page;
  public next_page;
  public prev_page;
  public id;
  public Ifollowing:[];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userServices: UsuarioServices,
    private _followServices: FollowServices,
    private _upload:uploadImagen,
    private _getcount: SidebarComponent
  ) {

    this.url = Global.url;
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();

   }

  ngOnInit() {
    this.getPage();
  }

  getPage(){
  
    this._route.params.subscribe(
      params=>{

        var userId = params['id'];

        var page = +params['page'];

        this.page = page


        if(!params['page']){
          page = 1;
        }

        if(!page){
          page = 1;
        }else{
          this.next_page = page + 1;
          this.prev_page = page - 1;
          
          if(this.prev_page <= 0){

            this.prev_page =1;

          }

          this.getFollowing(userId, page);
        }
      }
    )
  }



  getFollowing(userId,page){
    
    
    // Este petodo es para mostrarno a lo que seguimos y de esa forma, cuando veamos los seguidores de la demas persona
    //podemos ver di tambien nosotros los seguimos a ellos..
    let follow = true;
    this._followServices.getOwnFollow().subscribe(
      response=>{
        this.following = response.arrayId;

      },
      error=>{
        console.log(<any>error);
      }
    )
    
    

    this._followServices.getUsFollow(userId,page).subscribe(
      response=>{
        
        
        if(!response){
          
            this.status = 'Error';
            
          }else{
            this.id = userId;
            
            this.followed = response.Seguidores;
            
            this.pages = response.page;
            if(page > this.pages){
              this._router.navigate(['/following/',userId,1]);
            }
          }
       
        },
        error=>{
          console.log(<any>error);
        }
      )

  }

  // bueno me quede en la parte de los follow, al paracer hay algunos que no quieren ser agragado


  addFollow(followId){

 
   
    this.Follow = new Follow('',this.identity._id,followId);
    
    this._followServices.addFollow(this.Follow).subscribe(
      response=>{

        this._userServices.getCount().subscribe(
          response=>{

                this.following.push(followId);
                
                localStorage.setItem('count',JSON.stringify(response.response));
                this._getcount.resetCount();

          },
          error=>{
            console.log(<any>error);
          }
          
          )

       
      },
      error=>{
        console.log(<any>error);
      }

    )
  }

  public follow;
  mouseLeave(id){
   this.follow = 0;
  }

  mouseEnter(id){
    this.follow = id;
  }

  deleteFollow(id){


   this._followServices.deleteFollow(id).subscribe(
     response=>{

     
      if(response){
    
        this._userServices.getCount().subscribe(
          response=>{


            var seach = this.following.indexOf(id);

            if(seach){
              this.following.splice(seach,1);
              
              this._getcount.resetCount();
              localStorage.setItem('count',JSON.stringify(response.response));
        
             

            }

          },
          error=>{
            console.log(<any>error);
          }
        )
      }
          
     },
     error=>{
       console.log(<any>error);
     }
   )

  }

}
