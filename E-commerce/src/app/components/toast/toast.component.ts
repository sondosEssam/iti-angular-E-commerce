import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastContainerComponent {
  constructor(public notify: NotifyService) {}
}


