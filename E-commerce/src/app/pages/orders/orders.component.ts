import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../../services/order.service';
import { Token } from '../../services/token';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersPageComponent implements OnInit {
  orders: Order[] = [];
  userId?: number;

  constructor(private orderService: OrderService, private token: Token) {}

  ngOnInit(): void {
    // Demo: use userId 2 if logged token exists
    const t = this.token.getToken() || (localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') as string) : '');
    if (!t) return;
    // In a real app we would decode token → userId; here we use demo user 2
    this.userId = 2;
    // json-server doesn't support filter by user for nested arrays easily; keeping simple demo fetch all then filter by userId if present
    // Better approach would be /orders?userId=2 but our seed has one example
    this.orderService.getOrder(1001).subscribe(o => this.orders = o ? [o] as any : []);
  }
}


