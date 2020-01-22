import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Para la directiva de los forms..
import { FormsModule } from '@angular/forms';

// este import es para poder hacer la peticion http  // al servidor
import { HttpClientModule } from '@angular/common/http';

//app routing..
import {appRouterProvider, routing } from './app.routing';

import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { LoginComponent } from './component/login/login.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { TimelineComponent } from './component/timeline/timeline.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
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
    TimelineComponent,
    SidebarComponent,
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
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [
    appRouterProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
