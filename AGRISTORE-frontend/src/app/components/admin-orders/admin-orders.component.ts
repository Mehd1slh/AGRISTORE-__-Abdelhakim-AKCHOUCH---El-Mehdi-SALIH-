import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../controller/entities/order/order';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = []; // ✅ Store orders

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        console.log('✅ Orders received:', data);
        this.orders = data;
      },
      error: (err) => console.error('❌ Error fetching orders:', err)
    });
  }
}
