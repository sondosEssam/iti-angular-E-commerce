import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  q = '';

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.load();
    this.categoryService.getCategories().subscribe(c => this.categories = c);
  }

  load() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.applyFilters();
    });
  }

  applyFilters() {
    const term = this.q.trim().toLowerCase();
    this.filtered = this.products.filter(p => {
      const matchesTerm = !term || p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term);
      const matchesCat = !this.selectedCategory || p.category === this.selectedCategory;
      return matchesTerm && matchesCat;
    });
  }
}


