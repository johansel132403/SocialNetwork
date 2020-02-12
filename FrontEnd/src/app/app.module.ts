import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



//Para la directiva de los forms..
import { FormsModule } from '@angular/forms';

// este import es para poder hacer la peticion http  // al servidor
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

//angular2-module (para la hora)
import { MomentModule } from 'angular2-moment';


//app routing..
import {appRouterProvider, routing } from './app.routing';


//Este es el module del module de mensajes el cual es importa aqui en el principar para poder 
//usuarlo en toda la pagina..
import { MensajesModule } from './Mensajes/mensajes.module';


import { UserComponent } from './component/user/user.component';
import { LoginComponent } from './component/login/login.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { TimelineComponent } from './component/timeline/timeline.component';
import { PublicationComponent } from './component/publication/publication.component';
import { HomeComponent } from './component/home/home.component';
import { RegistroComponent } from './component/registro/registro.component';
import { FollowedComponent } from './component/followed/followed.component';
import { FollowingComponent } from './component/following/following.component';
import { EditComponent } from './component/edit/edit.component';
import { ErrorComponent } from './component/error/error.component';


import { SaveLogin } from './services/SaveLogin.services';

//Esto es para proteger las url 
import { SaveServices } from './services/SaveRed.serveces';

//ponemos el UsuarioServices en los providers para que a la hora de hacer la 
//verificacion con el SaveServices no nos de problema, porque usamos el Identity que es de UsuarioServis en toda la url 
//por eso hay que ponerla en el providers..
import { UsuarioServices } from './services/Usuario.services';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    PerfilComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationComponent,
    HomeComponent,
    RegistroComponent,
    FollowedComponent,
    FollowingComponent,
    EditComponent,
    ErrorComponent
    
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    MomentModule,
    MensajesModule
  ],
  providers: [
    appRouterProvider,
    SaveServices,
    UsuarioServices,
    SaveLogin
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
