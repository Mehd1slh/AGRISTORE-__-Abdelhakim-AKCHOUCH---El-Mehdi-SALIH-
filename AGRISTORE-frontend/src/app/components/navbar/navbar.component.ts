import {Component, DoCheck, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [RouterLink, NgIf],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkUserStatus();
  }

  ngDoCheck(): void {
    // ✅ Re-check user status on every Angular change detection cycle
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // ✅ User is logged in if token exists

    const storedRoles = localStorage.getItem('roles');

    if (storedRoles) {
      try {
        let roles: string[] = JSON.parse(storedRoles);

        if (!Array.isArray(roles)) {
          console.error("❌ Roles is not an array:", roles);
          this.isAdmin = false;
          return;
        }

        console.log("🔍 Checking roles:", roles);
        this.isAdmin = roles.some(role => typeof role === 'string' && role.trim().toUpperCase() === 'ADMIN');

        console.log("✅ Updated isAdmin:", this.isAdmin); // ✅ Debugging

      } catch (error) {
        console.error("❌ Error parsing roles from localStorage:", error);
        this.isAdmin = false;
      }
    } else {
      this.isAdmin = false;
    }
  }







  logout(): void {
    localStorage.clear(); // ✅ Clear user session
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/']); // ✅ Redirect to home page
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
