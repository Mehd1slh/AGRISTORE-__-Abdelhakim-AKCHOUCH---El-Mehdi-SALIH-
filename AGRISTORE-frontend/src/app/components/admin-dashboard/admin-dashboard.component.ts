import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {AdminSidebarComponent} from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterOutlet, AdminSidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  standalone: true,
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
