import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit {
 
  heroBanners = [
    { title: 'Big Sale', subtitle: 'Up to 70% Off Electronics', image: 'https://i.pinimg.com/1200x/62/a6/89/62a689b7c97e2af3c214d6f294f9eaea.jpg' },
    { title: 'New Arrivals', subtitle: 'Check the latest products', image: 'https://i.pinimg.com/1200x/95/f9/16/95f916f0e120311e8c76893a412e3077.jpg' },
    { title: 'Fashion Trends', subtitle: 'Stay stylish with us', image: 'https://i.pinimg.com/736x/a4/ab/8b/a4ab8b2f5d9c46825d2128378ad672cc.jpg' },
    { title: 'Books & More', subtitle: 'Get your favorite books', image: 'https://i.pinimg.com/1200x/bb/c4/80/bbc480c2e2114bc1dcee217ca4cf6a81.jpg' },
    { title: 'Gaming Deals', subtitle: 'Play more, pay less', image: 'https://i.pinimg.com/1200x/df/28/e7/df28e7e9a98dd9922e3ade7c6886c4b4.jpg' }
  ];

  featuredProducts: Product[] = [];


  promoBanners = [
    { title: 'winter Sale', image: 'https://i.pinimg.com/736x/ca/d2/9d/cad29dba0d5abfa4d6e137e3ff781b06.jpg' },
    { title: 'Buy 1 Get 1 Free', image: 'https://i.pinimg.com/736x/c9/a4/87/c9a487b5ee9cf1e411d780aed66bbdf8.jpg' },
    { title: 'Winter Discount', image: 'https://i.pinimg.com/736x/91/94/bb/9194bbf5b5babf23ebf5975c6f1627e1.jpg' }
  ];


  categories = [
    { slug: 'electronics', name: 'Electronics' },
    { slug: 'fashion', name: 'Fashion' },
    { slug: 'books', name: 'Books' }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Fetch first 3 products as featured products
    this.productService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 3);
    });
  }
}


