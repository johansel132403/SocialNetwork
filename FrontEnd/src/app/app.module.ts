import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    EditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
