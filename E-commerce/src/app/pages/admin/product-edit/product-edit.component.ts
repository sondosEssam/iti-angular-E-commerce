import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditPageComponent {
  // flexible shape to support title/description fields
  product: Partial<Product> = { title: 'Laptop', price: 1000, category: 'electronics', stock: 10, image: '', description: '' };

  save() {
    alert('Product updated: ' + JSON.stringify(this.product));
  }
}
