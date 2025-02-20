import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  standalone: true,
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {

}
