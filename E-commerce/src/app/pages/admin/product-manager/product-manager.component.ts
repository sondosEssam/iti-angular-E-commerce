import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-manager',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerPageComponent {
  products = [
    { id: 1, name: 'Laptop', price: 1000, stock: 5 },
    { id: 2, name: 'Phone', price: 500, stock: 10 },
  ];

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    alert('Product deleted with id: ' + id);
  }
}
