import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutPageComponent {
  shipping = { name: '', address: '', city: '', country: '' };
  billingSameAsShipping = true;
  payment = { method: 'cod' };
  submitted = false;

  constructor(private orderService: OrderService, private cartService: CartService, private router: Router) {}

  placeOrder() {
    this.submitted = true;
    if (!this.shipping.name || !this.shipping.address || !this.shipping.city || !this.shipping.country) {
      return;
    }
    const userId = 2; // demo
    this.cartService.getCart(userId).subscribe(cartItems => {
      const total = cartItems.reduce((sum, it) => sum + it.quantity, 0); // simplistic
      const order = {
        userId,
        items: cartItems.map(i => ({ productId: i.productId, quantity: i.quantity })),
        total,
        status: 'paid',
        createdAt: new Date().toISOString()
      } as any;
      this.orderService.createOrder(order).subscribe(created => {
        this.router.navigate(['/order-confirmation', created.id]);
      });
    });
  }
}


