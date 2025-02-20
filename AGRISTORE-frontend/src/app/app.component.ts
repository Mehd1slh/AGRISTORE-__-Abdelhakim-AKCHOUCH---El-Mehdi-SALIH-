import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [
        CommonModule,
        RouterModule, // ✅ Import RouterModule
        RouterOutlet, // ✅ Needed for navigation
        NavbarComponent, // ✅ Import Navbar
    ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Agriculture-market-front-end';
}
