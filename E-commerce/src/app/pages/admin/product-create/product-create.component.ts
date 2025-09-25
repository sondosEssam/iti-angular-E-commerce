import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreatePageComponent {
  product = { name: '', price: 0, category: '', stock: 0, image: '' };

  save() {
    alert('Product created: ' + JSON.stringify(this.product));
  }
}
