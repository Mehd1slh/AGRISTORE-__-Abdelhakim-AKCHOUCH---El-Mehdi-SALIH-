import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');

    if (!token) {
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return false;
    }

    if (roles.includes('ADMIN')) {
      return true; // Allow access to admin pages
    } else {
      this.router.navigate(['/']); // Redirect to home if not an admin
      return false;
    }
  }

  private getRoles(): string[] {
    try {
      const storedRoles = localStorage.getItem('roles'); // ✅ Read roles from storage
      return storedRoles ? JSON.parse(storedRoles) : []; // ✅ Convert to array
    } catch (e) {
      return [];
    }
  }
}
