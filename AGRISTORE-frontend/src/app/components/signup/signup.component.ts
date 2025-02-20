  import { Component } from '@angular/core';
  import { AuthService } from '../../services/client/auth.service';
  import {Router, RouterLink} from '@angular/router';
  import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-signup',
    standalone: true,
    templateUrl: './signup.component.html',
    imports: [FormsModule, RouterLink],
    styleUrls: ['./signup.component.css']
  })
  export class SignupComponent {
    firstName = '';
    lastName = '';
    email = '';
    password = '';

    constructor(private authService: AuthService, private router: Router) {}

    signup(): void {
      if (!this.firstName || !this.lastName || !this.email || !this.password) {
        alert('Please fill all fields.');
        return;
      }

      const newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };

      this.authService.signup(newUser).subscribe({
        next: () => {
          alert('Signup Successful! Please log in.');
          this.router.navigate(['/login']); // ✅ Redirect to Login Page
        },
        error: (err) => {
          console.error('Signup Error:', err);
          alert('Signup failed. Please try again.');
        }
      });
    }

  }
