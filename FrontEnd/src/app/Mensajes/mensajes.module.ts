import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//Este modulo es para poder usar el formulario
import { FormsModule } from '@angular/forms';


//Components..
import { AddComponent } from '../Mensajes/add/add.component';
import { MainComponent } from '../Mensajes/main/main.component';
import { ReceivedComponent } from '../Mensajes/received/received.component';
import { SendedComponent } from '../Mensajes/sended/sended.component';


//app Routing
import { MensajesRoutingModule } from '../Mensajes/mensajes.routing';

//esteo es para la fecha... (de este module)
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [

    AddComponent,
    MainComponent,
    ReceivedComponent,
    SendedComponent
  ],


  imports: [
    CommonModule,
    FormsModule,
    MensajesRoutingModule,
    MomentModule
   
  ],
  exports:[
    AddComponent,
    MainComponent,
    ReceivedComponent,
    SendedComponent
  ]
})
export class MensajesModule {}
