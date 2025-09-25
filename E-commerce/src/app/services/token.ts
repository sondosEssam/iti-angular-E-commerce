import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Token {
  // 👇 this is writable by default
  private token = signal<string>("");

  constructor() {}

  setToken(token: string): void {
    this.token.set(token);   // update signal
  }

  getToken(): string {
    return this.token();     // read signal
  }

  removeToken(): void {
    this.token.set("");      // reset signal
  }

  generateToken(): string {
    return Math.random().toString(36).substring(2);
  }
  logout(): void {
    this.removeToken();
    // Additional logout logic can be added here
  localStorage.removeItem('auth');
  }
}
