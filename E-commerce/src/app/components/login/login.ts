import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Http } from '../../services/http';
import { NotifyService } from '../../services/notify.service';
import { Token } from '../../services/token';
import { IUser } from '../../interface/iuser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
constructor(private http: Http, private token:Token, private router:Router, private notify: NotifyService) 
{ }
 users:IUser[] = [];
ngOnInit(): void {
  if(this.token.getToken())
  {
    this.router.navigate(['/profile']);
  }
  this.http.getUsers().subscribe({
    next:(data)=>{
      this.users = data;
    },
    error:(err)=>{
      console.error("Error fetching users:", err);
    }
  });
}
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
onSubmit()
{
  if(!this.form.valid)
  {
    this.notify.show('Please fill all fields correctly.', 'warning');
    return;
  }
   const {email, password} = this.form.value;
  const user = this.users.find(u => u.email === email && u.password === password);
  if(user)
  {
    this.token.setToken(user.token!);
    localStorage.setItem("auth", JSON.stringify(user.token));
    this.notify.show('Welcome back!', 'success');
    if (user.role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }
  else
  {
    this.notify.show('Invalid email or password', 'danger');
  }

}
}