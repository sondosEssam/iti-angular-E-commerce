import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Token } from '../../services/token';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
constructor(private token: Token, private router: Router) { }

logout(): void {
  this.token.logout();
}

goTo(path: string): void {
  this.router.navigate([path]);
}

isAccountOpen = false;
toggleAccount(): void {
  this.isAccountOpen = !this.isAccountOpen;
}

isLoggedIn(): boolean {
  return !!this.token.getToken();
}
  }
