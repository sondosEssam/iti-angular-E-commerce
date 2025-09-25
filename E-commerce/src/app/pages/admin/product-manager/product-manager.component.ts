import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-product-manager',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerPageComponent {
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.productService.getProducts().subscribe(p => this.products = p);
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.load());
  }
}
