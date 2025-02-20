import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        console.log("🔍 DEBUG - Login Response:", response);

        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', response.email);
          localStorage.setItem('roles', JSON.stringify(response.role)); // ✅ Store roles as array

          if (response.clientId) {
            localStorage.setItem('clientId', response.clientId.toString()); // ✅ Store clientId
          }

          if (response.firstName && response.lastName) {
            localStorage.setItem('userName', `${response.firstName} ${response.lastName}`);
          }
        }
      })
    );
  }





  signup(client: { firstName: string; lastName: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, client).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('clientId', response.clientId);
          localStorage.setItem('userName', `${response.firstName} ${response.lastName}`); // ✅ Store user name
        }
      })
    );
  }

  signup_admin(client: { firstName: string; lastName: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/signup`, client).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('clientId', response.clientId);
          localStorage.setItem('userName', `${response.firstName} ${response.lastName}`); // ✅ Store user name
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('clientId');
    localStorage.removeItem('userName'); // ✅ Remove stored name
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  getClientId(): number | null {
    const storedClientId = localStorage.getItem('clientId');
    return storedClientId ? Number(storedClientId) : null; // ✅ Convert to number
  }


  getClientIdFromEmail(email: string): void {
    this.http.get<{ id: number }>(`${this.apiUrl}/clients/by-email/${email}`).subscribe({
      next: (response) => {
        console.log("DEBUG - Retrieved Client ID from email:", response.id);
        localStorage.setItem('clientId', response.id.toString());
      },
      error: (err) => console.error("DEBUG - Error fetching clientId from email:", err)
    });
  }



}
