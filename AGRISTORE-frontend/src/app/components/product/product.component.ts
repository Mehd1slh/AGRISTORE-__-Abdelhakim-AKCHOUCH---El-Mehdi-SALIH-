import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { OrderService } from '../../services/order/order.service';
import { AuthService } from '../../services/client/auth.service';
import { Product } from '../../controller/entities/product/product';
import { Order } from '../../controller/entities/order/order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  clientId: number | null = null;
  orderDialog: boolean = false;
  selectedProduct: Product | null = null;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    protected authService: AuthService
  ) {}

  ngOnInit(): void {
    this.clientId = this.authService.getClientId();
    console.log("DEBUG - Retrieved Client ID:", this.clientId);
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  // ✅ Show Order Confirmation Dialog
  showOrderConfirmation(product: Product): void {
    this.clientId = this.authService.getClientId();

    if (!this.clientId) {
      alert('❌ You need to log in first!');
      console.log("DEBUG - No clientId found. Redirecting to login.");
      window.location.href = "/login";
      return;
    }

    this.selectedProduct = product;
    this.orderDialog = true;
  }

  // ✅ Confirm and Place Order
  placeOrder(): void {
    if (!this.selectedProduct || !this.clientId) {
      alert('❌ Error: Missing product or client ID.');
      return;
    }

    const newOrder: Order = {
      totalAmount: this.selectedProduct.price * this.quantity,
      clientId: this.clientId, // ✅ Now correctly retrieved
      productId: this.selectedProduct.id,
      quantity: this.quantity,
      orderDate: new Date().toISOString()
    };

    console.log("DEBUG - Placing Order:", newOrder);

    this.orderService.placeOrder(newOrder).subscribe({
      next: () => {
        alert('✅ Order placed successfully!');
        this.orderDialog = false;
      },
      error: (err) => console.error('❌ Error placing order:', err)
    });
  }
}
