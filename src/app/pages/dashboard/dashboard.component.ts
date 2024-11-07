import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';

@Component({
  standalone: true,
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    RouterLink, RouterLinkActive, RouterOutlet,
    MatIconModule,
  ],
  animations: [fadeInUp400ms],
})
export class DashboardComponent {

}
