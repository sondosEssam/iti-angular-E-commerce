import { Injectable, signal } from '@angular/core';

export type ToastType = 'info' | 'success' | 'warning' | 'danger';
export interface Toast { id: number; type: ToastType; message: string }

@Injectable({ providedIn: 'root' })
export class NotifyService {
  private nextId = 1;
  toasts = signal<Toast[]>([]);

  show(message: string, type: ToastType = 'info', timeoutMs = 3000) {
    const toast: Toast = { id: this.nextId++, type, message };
    this.toasts.update(list => [...list, toast]);
    setTimeout(() => this.dismiss(toast.id), timeoutMs);
  }

  dismiss(id: number) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}


