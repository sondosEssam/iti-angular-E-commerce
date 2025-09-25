import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreatePageComponent {
  // Use 'any' here to avoid template type errors during migration from name->title
  product: any = { title: '', price: 0, category: '', stock: 0, image: '', description: '' };

  constructor(private productService: ProductService, private router: Router) {}

  save() {
    const payload: Product = {
      id: Date.now(),
      title: this.product.title || '',
      price: Number(this.product.price) || 0,
      category: this.product.category || '',
      stock: Number(this.product.stock) || 0,
      image: this.product.image || '',
      description: this.product.description || ''
    } as Product;
    this.productService.createProduct(payload).subscribe(() => {
      this.router.navigate(['/admin/products']);
    });
  }
}
