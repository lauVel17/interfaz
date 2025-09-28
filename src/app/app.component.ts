import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { NgxSpinnerModule } from 'ngx-spinner';
import { SwPush } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'sistemagrupoata';
  nuevaNotificacionRecibida: boolean = false;
  constructor() {}

  ngOnInit(): void {
 
  }
  
  
}
