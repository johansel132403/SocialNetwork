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
    MomentModule
  ],
  providers: [
    appRouterProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
