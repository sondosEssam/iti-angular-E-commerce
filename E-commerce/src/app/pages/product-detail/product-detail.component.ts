import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailPageComponent implements OnInit {
  product?: Product;
  qty: number = 1;
  constructor(public route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private notify: NotifyService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProduct(id).subscribe(p => this.product = p);
    }
  }

  addToCart() {
    if (!this.product) return;
    const userId = 2; // demo user for now
    const quantity = Math.max(1, this.qty | 0);
    const productId = this.product.id;
    // If same product exists in cart, increase quantity instead of creating new row
    this.cartService.getCart(userId).subscribe(items => {
      const existing = items.find(i => i.productId === productId);
      if (existing) {
        const updated = { ...existing, quantity: existing.quantity + quantity };
        this.cartService.updateItem(updated).subscribe(() => this.notify.show('Added to cart', 'success'));
      } else {
        this.cartService.addToCart({ userId, productId, quantity }).subscribe(() => this.notify.show('Added to cart', 'success'));
      }
    });
  }
}


