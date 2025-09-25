import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Token } from '../../services/token';
import { Router } from '@angular/router';
import { Http } from '../../services/http';
import { IUser } from '../../interface/iuser';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  constructor(private token: Token, private router: Router, private http: Http) {}
  user?: IUser | null;
ngOnInit(): void {
  if(!this.token.getToken())
  {
    this.router.navigate(['/account/login']);
    return;
  }
  const token = this.token.getToken();
  this.http.getUserByToken(token).subscribe({
    next: (user) => {
      this.user = user;
    },
    error: (err) => {
      console.error("Error fetching user:", err);
    }
  });
}
}
