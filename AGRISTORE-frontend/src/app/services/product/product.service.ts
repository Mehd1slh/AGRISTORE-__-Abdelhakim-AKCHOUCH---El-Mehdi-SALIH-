import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../../controller/entities/product/product';
import { environment } from '../../../environments/environment';
import {Category} from '../../controller/entities/product/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl; // Gateway URL from environment config

  constructor(private http: HttpClient) {}

  // ✅ Fetch all products
  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Add a new product
  addProduct(product: {
    availableQuantity: number;
    price: number;
    imageUrl: string;
    name: string;
    description: string;
    category: { id: number }
  }): Observable<Product> {
    const payload = {
      name: product.name,
      description: product.description,
      availableQuantity: product.availableQuantity,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl
    };


    return this.http.post<Product>(`${this.apiUrl}/products`, payload);



  }

  // ✅ Delete a product by ID
  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${productId}`).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Update a product
  public updateProduct(productId: number, product: {
    availableQuantity: number;
    price: number;
    imageUrl: string;
    name: string;
    description: string;
    category: { id: number }
  }): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${productId}`, product).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    console.error('Error handling products:', error);
    return throwError(() => new Error('An error occurred while processing the request.'));
  }
}
