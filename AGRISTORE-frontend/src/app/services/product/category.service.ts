import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../controller/entities/product/category';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root' // ✅ Makes it available across the app
})
export class CategoryService {
  private apiUrl = environment.apiUrl + '/categories';

  constructor(private http: HttpClient) {}

  // ✅ Fetch all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
