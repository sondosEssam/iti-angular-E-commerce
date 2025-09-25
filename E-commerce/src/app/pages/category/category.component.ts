import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryPageComponent implements OnInit {
  products: Product[] = [];
  slug = '';

  constructor(public route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('id') || '';
    if (this.slug) {
      this.productService.getProductsByCategory(this.slug).subscribe(p => this.products = p);
    }
  }
}


