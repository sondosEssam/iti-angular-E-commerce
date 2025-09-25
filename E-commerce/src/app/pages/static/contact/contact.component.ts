import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';

  submitted = false;
  success = false;

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (form.invalid) {
      this.success = false;
      return;
    }

    console.log('Form submitted:', {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    });

    this.success = true;
    form.resetForm();
    this.submitted = false;
  }
}

