import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../controller/entities/product/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category } from '../../controller/entities/product/category';
import {CategoryService} from '../../services/product/category.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AdminProductsComponent implements OnInit {

  private apiUrl = environment.apiUrl;
  products: Product[] = [];
  categories: Category[] = []; // ✅ Store category objects
  newProduct: {
    availableQuantity: number;
    price: number;
    imageUrl: string;
    name: string;
    description: string;
    id: number;
    category: Category | null; // ✅ Category should be an object, not a string
  } = this.getEmptyProduct();
  productDialog: boolean = false;

  // Pagination
  currentPage: number = 1;
  entriesPerPage: number = 5; // Default to 5 entries per page
  paginatedProducts: Product[] = []; // Products to display on the current page

  // Sorting
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private productService: ProductService, private categoryService: CategoryService ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log("✅ Products Fetched:", data);
        this.products = data;
        this.updatePagination(); // Call this to update paginatedProducts
      },
      error: (err) => console.error('❌ Error loading products:', err)
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        console.log("✅ Categories Received:", data);
        this.categories = data;
      },
      error: (err) => console.error('❌ Error fetching categories:', err)
    });
  }


  updatePagination(): void {
    const start = (this.currentPage - 1) * this.entriesPerPage;
    const end = start + this.entriesPerPage;
    this.paginatedProducts = this.products.slice(start, end); // Slice the products array
  }

  nextPage(): void {
    if (this.currentPage * this.entriesPerPage < this.products.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.products.length / this.entriesPerPage);
    const pages: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getPages().length) {
      this.currentPage = page;
      this.updatePagination();
    }
  }


  // Sorting Logic (applies only to the displayed products)
  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.paginatedProducts.sort((a, b) => {
      const valueA = this.getPropertyValue(a, column);
      const valueB = this.getPropertyValue(b, column);

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? '▲' : '▼';
    }
    return '';
  }

  getPropertyValue(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => (o ? o[p] : null), obj);
  }


  editProduct(product: Product): void {
    this.newProduct = { ...product };
    this.productDialog = true;
  }

  confirmDeleteProduct(product: Product): void {
    const confirmed = confirm(`Are you sure you want to delete ${product.name}?`);
    if (confirmed) {
      this.deleteProduct(product.id);
    }
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        alert('❌ Product deleted successfully');
      },
      error: (err) => console.error('❌ Error deleting product:', err)
    });
  }

  openNew(): void {
    this.newProduct = this.getEmptyProduct();
    this.productDialog = true;
  }

  hideDialog(): void {
    this.productDialog = false;
  }

  saveProduct(): void {
    if (!this.newProduct.category) {
      alert("❌ Please select a category.");
      return;
    }

    const productPayload = {
      name: this.newProduct.name,
      description: this.newProduct.description,
      availableQuantity: this.newProduct.availableQuantity,
      price: this.newProduct.price,
      category: { id: this.newProduct.category.id }, // ✅ Use selected category directly
      imageUrl: this.newProduct.imageUrl || ''
    };

    if (this.newProduct.id) {
      this.productService.updateProduct(this.newProduct.id, productPayload).subscribe({
        next: () => {
          alert('✅ Product updated successfully');
          this.productDialog = false;
        },
        error: (err) => alert(`Error updating product: ${err.message}`)
      });
    } else {
      this.productService.addProduct(productPayload).subscribe({
        next: () => {
          this.products.push(<Product>{id: 0, ...productPayload, category: this.newProduct.category});
          alert('✅ Product added successfully');
          this.productDialog = false;
        },
        error: (err) => alert(`Error adding product: ${err.message}`)
      });
    }
  }



  private getEmptyProduct(): {
    availableQuantity: number;
    price: number;
    imageUrl: string;
    name: string;
    description: string;
    id: number;
    category: Category | null;
  } {
    return {
      id: 0,
      name: '',
      description: '',
      availableQuantity: 0,
      price: 0,
      category: null, // ✅ Use null instead of empty string
      imageUrl: ''
    };
  }

  protected readonly Math = Math;
}
