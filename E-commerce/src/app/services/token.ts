import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Token {
  // 👇 this is writable by default
  private token = signal<string>("");
  private userId = signal<number | string | null>(null);

  constructor() {
    const saved = localStorage.getItem('auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'string') {
          this.token.set(parsed);
        }
      } catch {
        // ignore
      }
    }
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      try {
        const parsedId = JSON.parse(savedUserId);
        this.userId.set(parsedId);
      } catch {
        this.userId.set(savedUserId);
      }
    }
  }

  setToken(token: string, userId?: number | string): void {
    this.token.set(token);   // update signal
    if (userId !== undefined) {
      this.setUserId(userId);
    }
  }

  getToken(): string {
    return this.token();     // read signal
  }

  removeToken(): void {
    this.token.set("");      // reset signal
    this.userId.set(null);
  }

  generateToken(): string {
    return Math.random().toString(36).substring(2);
  }
  logout(): void {
    this.removeToken();
    // Additional logout logic can be added here
  localStorage.removeItem('auth');
  localStorage.removeItem('userId');
  }

  setUserId(id: number | string): void {
    this.userId.set(id);
    localStorage.setItem('userId', JSON.stringify(id));
  }

  getUserId(): number | string | null {
    const id = this.userId();
    if (id !== null) return id;
    const savedUserId = localStorage.getItem('userId');
    if (!savedUserId) return null;
    try { return JSON.parse(savedUserId); } catch { return savedUserId; }
  }
}
