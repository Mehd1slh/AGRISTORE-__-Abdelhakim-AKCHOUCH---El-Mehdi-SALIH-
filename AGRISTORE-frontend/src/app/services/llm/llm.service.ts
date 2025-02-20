import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Product} from '../../controller/entities/product/product';

@Injectable({
  providedIn: 'root'
})
export class LlmService {
  private apiUrl = environment.apiUrl; // Gateway URL from environment config

  constructor(private http: HttpClient) {}

  public getAiResponse(question: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/llm/chatbot/${encodeURIComponent(question)}`, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    console.error('Error fetching products:', error);
    return throwError(() => new Error('An error occurred while fetching data.'));
  }
}
