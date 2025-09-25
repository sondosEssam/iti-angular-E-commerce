import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditPageComponent {
  product = { name: 'Laptop', price: 1000, category: 'Electronics', stock: 10, image: '' };

  save() {
    alert('Product updated: ' + JSON.stringify(this.product));
  }
}
