import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerPageComponent {
  users = [
    { name: 'Menna Ali', role: 'Admin', status: 'Active' },
    { name: 'Omar Hassan', role: 'User', status: 'Inactive' },
    { name: 'Sara Mohamed', role: 'User', status: 'Active' },
  ];
}


