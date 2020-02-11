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



const appRouter: Routes = [

    {path: '',component: HomeComponent},
    {path: 'home',component: HomeComponent},
    {path: 'timeline',component: TimelineComponent},
    {path: 'gente',component: UserComponent},
    {path: 'gente/:page',component: UserComponent},
    {path: 'login',component: LoginComponent},
   // {path: 'following', component: FollowingComponent},
    {path: 'following/:id/:page', component: FollowingComponent},
    {path: 'followed/:id/:page',component:FollowedComponent},
    {path: 'registro',component: RegistroComponent},
    {path: 'perfil/:id',component: PerfilComponent},
    {path: 'edit',component:EditComponent},
    {path: '**',component: ErrorComponent}


]

export const appRouterProvider: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRouter);