import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-principal',
  standalone: true,
 imports: [CommonModule, RouterModule, RouterLink, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleSidebar(): void {
    const sidebar = document.querySelector('.sidebar');
    const body = document.querySelector('body');

    if (body) {
      body.classList.toggle('toggle-sidebar');
    }
  }
}
