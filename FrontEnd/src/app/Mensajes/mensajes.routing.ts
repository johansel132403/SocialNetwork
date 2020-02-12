import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';


//components...
import { AddComponent } from '../Mensajes/add/add.component';
import { MainComponent } from '../Mensajes/main/main.component';
import { ReceivedComponent } from '../Mensajes/received/received.component';
import { SendedComponent } from '../Mensajes/sended/sended.component';


//para tener la url seguras, esto es un servicio greado para la seguridad de la url,
import { SaveServices } from '../services/SaveRed.serveces';

const mensajesRouter: Routes = [

{
    //el mensaje va de inicio...
    path: 'mensajes', component:MainComponent,
    children:[

          //Esto aqui es para que al inicio de la pagina mensaje inicie el receiver..
        {path: '',redirectTo:'receiver',pathMatch:'full'},
        {path: 'addmensajes',component:AddComponent,canActivate:[SaveServices]},
        {path: 'receiver', component: ReceivedComponent,canActivate:[SaveServices]},
        {path: 'receiver/:page',component:ReceivedComponent,canActivate:[SaveServices]},
        {path: 'sended',component:SendedComponent,canActivate:[SaveServices]},
        {path: 'sended/:page',component:SendedComponent,canActivate:[SaveServices]}
    ]
}


                           /// OJO   --///  TODO ESTO SE HACE, PORQUE HICIMOS
                           //UN MODULE NUEVO PARA TENERLO SEPARADO, POR SI 
                           //QUEREMOS ESTE MODULO DE MENSAJERIA PARA OTRO PROYECTO
                           //QUE SE PUEDE EXPORTAR FACIL Y MEJOR.
];

@NgModule ({

    imports:[
        RouterModule.forChild(mensajesRouter)
    ],

    exports:[
        RouterModule
    ]
})

export class MensajesRoutingModule{}
