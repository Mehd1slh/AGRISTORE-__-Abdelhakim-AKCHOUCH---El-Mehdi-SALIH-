import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/client/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.email || !this.password) {
      alert('Please enter email and password.');
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        alert('✅ Login Successful!');

        // ✅ Store token, roles, and user info in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('roles', JSON.stringify(response.role || []));
        localStorage.setItem('userName', `${response.firstName} ${response.lastName}`);

        // ✅ Store clientId properly as a NUMBER
        if (response.clientId) {
          localStorage.setItem('clientId', response.clientId.toString());
          console.log("DEBUG - Stored clientId:", response.clientId);
        } else {
          console.warn("⚠️ No clientId received from backend!");
        }

        // ✅ Redirect the user immediately after login
        this.router.navigate(['/']).then(() => {
          window.location.reload(); // ✅ Refresh to update navbar dynamically
        });

      },
      error: (err) => {
        console.error('❌ Login Error:', err);
        alert('Invalid credentials. Please try again.');
      }
    });
  }
}
