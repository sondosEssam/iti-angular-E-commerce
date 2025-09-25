import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Token } from '../../services/token';

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

  constructor(
    private orderService: OrderService, 
    private cartService: CartService, 
    private router: Router,
    private tokenService: Token
  ) {}

  placeOrder() {
    this.submitted = true;
    if (!this.shipping.name || !this.shipping.address || !this.shipping.city || !this.shipping.country) {
      return;
    }
    
    // Get user ID from Token service (more reliable than localStorage)
    const userId = this.tokenService.getUserId();
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    this.cartService.getCart(userId as number).subscribe(cartItems => {
      const total = cartItems.reduce((sum, it) => sum + it.quantity, 0); // simplistic
      const order = {
        userId,
        items: cartItems.map(i => ({ productId: i.productId, quantity: i.quantity })),
        total,
        status: 'paid',
        createdAt: new Date().toISOString()
      } as any;
      
      this.orderService.createOrder(order).subscribe(created => {
        // Clear cart items after successful order creation
        this.cartService.clearCart(userId as number).subscribe(() => {
          console.log('Cart cleared after order placement');
        });
        this.router.navigate(['/order-confirmation', created.id]);
      });
    });
  }
}


