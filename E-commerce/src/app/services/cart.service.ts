import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly baseUrl = '/api';
  constructor(private http: HttpClient) {}

  getCart(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/cart?userId=${userId}`);
  }

  addToCart(item: Omit<CartItem, 'id'>): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.baseUrl}/cart`, item);
  }

  updateItem(item: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.baseUrl}/cart/${item.id}`, item);
  }

  removeItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cart/${id}`);
  }

  clearCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cart?userId=${userId}`);
  }
}



