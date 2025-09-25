import { Component } from '@angular/core';
import { Token } from '../../services/token';
import { Router } from '@angular/router';
import { Http } from '../../services/http';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  constructor(private token: Token, private router: Router, private http: Http) {}
ngOnInit(): void {
  if(!this.token.getToken())
  {
    this.router.navigate(['/login']);
    return;
  }
  const token = this.token.getToken();
  this.http.getUserByToken(token).subscribe({
    next: (user) => {
      // Handle the user data
    },
    error: (err) => {
      console.error("Error fetching user:", err);
    }
  });
}
}
