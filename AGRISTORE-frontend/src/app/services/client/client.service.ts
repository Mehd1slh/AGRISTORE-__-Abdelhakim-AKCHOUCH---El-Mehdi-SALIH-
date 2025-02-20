import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Client } from '../../controller/entities/client/client';
import { environment } from '../../../environments/environment';
import {Product} from '../../controller/entities/product/product';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || ''; // ✅ Ensure token is not null
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  public addClient(client: Client): Observable<Client> {
    console.log("📢 DEBUG - Sending client payload:", client);
    return this.http.post<Client>(`${this.apiUrl}/clients`, client, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }


  public deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clients/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  public updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/clients/${id}`, client, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }




  private handleError(error: HttpErrorResponse) {
    console.error('❌ HTTP ERROR:', error.message);
    console.error('❌ Full Response:', error);
    return throwError(() => new Error('An error occurred while processing the request.'));
  }


  private getEmptyClient(): Client {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roles: ['CLIENT'] // ✅ Ensure it's an array
    };
  }

}
