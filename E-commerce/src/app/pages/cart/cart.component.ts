import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { ProductService, Product } from '../../services/product.service';
import { Token } from '../../services/token';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartPageComponent implements OnInit {
  items: (CartItem & { product?: Product })[] = [];
  subtotal = 0;

  constructor(
    private cartService: CartService, 
    private productService: ProductService,
    private tokenService: Token
  ) {}

  ngOnInit(): void {
    // Get user ID from Token service (more reliable than localStorage)
    const userId = this.tokenService.getUserId();
    if (!userId) {
      console.error('No user ID found');
      return;
    }
    
    this.cartService.getCart(userId as number).subscribe(items => {
      // compress same product rows
      const map = new Map<number, CartItem>();
      items.forEach(it => {
        const found = map.get(it.productId);
        if (found) {
          found.quantity += it.quantity;
        } else {
          map.set(it.productId, { ...it });
        }
      });
      this.items = Array.from(map.values());
      this.calculateTotals();
      // hydrate product details
      items.forEach((it, idx) => {
        this.productService.getProduct(it.productId).subscribe(p => {
          const targetIdx = this.items.findIndex(x => x.productId === it.productId);
          if (targetIdx !== -1) this.items[targetIdx].product = p;
          this.calculateTotals();
        });
      });
    });
  }

  updateQuantity(item: CartItem, delta: number) {
    const next = Math.max(1, item.quantity + delta);
    const updated: CartItem = { ...item, quantity: next };
    this.cartService.updateItem(updated).subscribe(() => {
      item.quantity = next;
      this.calculateTotals();
    });
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item.id).subscribe(() => {
      this.items = this.items.filter(i => i.id !== item.id);
      this.calculateTotals();
    });
  }

  private calculateTotals() {
    this.subtotal = this.items.reduce((sum, it) => sum + (it.product?.price || 0) * it.quantity, 0);
  }
}


