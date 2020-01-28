import { Component, OnInit,DoCheck } from '@angular/core';
import { UsuarioServices } from '../../services/Usuario.services';
import { Global } from '../../services/Global';



@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit,DoCheck {

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck(){

  }

}
