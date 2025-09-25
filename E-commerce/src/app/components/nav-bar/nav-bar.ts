import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Token } from '../../services/token';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
constructor(private token: Token) { }

logout(): void {
  this.token.logout();
}
  }
