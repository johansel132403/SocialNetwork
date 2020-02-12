import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ErrorComponent } from './component/error/error.component';

import { UserComponent } from './component/user/user.component';

import { LoginComponent } from './component/login/login.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { TimelineComponent } from './component/timeline/timeline.component';

import { PublicationComponent } from './component/publication/publication.component';
import { HomeComponent } from './component/home/home.component';
import { RegistroComponent } from './component/registro/registro.component';
import { FollowedComponent } from './component/followed/followed.component';
import { FollowingComponent } from './component/following/following.component';
import { EditComponent } from './component/edit/edit.component';


//Esto es para proteger las Url.. 
//Tienen que estar registrado para poder pasar a la pagina 
import { SaveServices } from './services/SaveRed.serveces';

//Este imoport es para que no podamos entrar al login una vez registrado..
import { SaveLogin } from './services/SaveLogin.services';

const appRouter: Routes = [

    {path: '',component: HomeComponent},
    {path: 'home',component: HomeComponent,canActivate:[SaveServices]},
    {path: 'timeline',component: TimelineComponent,canActivate:[SaveServices]},
    {path: 'gente',component: UserComponent,canActivate:[SaveServices]},
    {path: 'gente/:page',component: UserComponent,canActivate:[SaveServices]},
    {path: 'login',component: LoginComponent,canActivate:[SaveLogin]},
   // {path: 'following', component: FollowingComponent},
    {path: 'following/:id/:page', component: FollowingComponent,canActivate:[SaveServices]},
    {path: 'followed/:id/:page',component:FollowedComponent,canActivate:[SaveServices]},
    {path: 'registro',component: RegistroComponent},
    {path: 'perfil/:id',component: PerfilComponent,canActivate:[SaveServices]},
    {path: 'edit',component:EditComponent,canActivate:[SaveServices]},
    {path: '**',component: ErrorComponent}


]

export const appRouterProvider: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRouter);