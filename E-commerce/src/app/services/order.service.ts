import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem { productId: number; quantity: number }
export interface Order {
  id?: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly baseUrl = '/api';
  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, order);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${id}`);
  }
}



