import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Http } from '../../services/http';
import { IUser } from '../../interface/iuser';
import { Route, Router } from '@angular/router';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPassword {
  constructor(private http: Http, private router:Router, private notify: NotifyService) { }
  ngOnInit(): void {
  this.http.getUsers().subscribe({
    next:(data)=>{
      this.users = data;
    },
    error:(err)=>{
      console.error("Error fetching users:", err);
    }
  });
  }
  users: IUser[] = [];
  fb = inject (FormBuilder);
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    new_password: ['', Validators.required],
    confirm_new_password: ['', Validators.required],
  });
  onSubmit()
  {
    if(!this.form.valid)
    {
      this.notify.show('Please fill all fields correctly.', 'warning');
      return;
    }
      const {email, new_password, confirm_new_password} = this.form.value;
      if(!this.users.find(u=>u.email == email)){
        this.notify.show('Email not found. please sign up', 'warning');
        this.router.navigate(['/account/register']);
        return;
      }
      if(new_password !== confirm_new_password){
        this.notify.show('Password and Confirm Password do not match', 'warning');
        return;
      }
      const user= this.users.find(u=>u.email == email);
      if (!user) {
          this.notify.show('User not found', 'danger');
          return;
        }
      user.password = new_password!;
      // update password
      this.http.updatePassword(user).subscribe({
        next: (data)=>{
          this.notify.show('Password updated successfully', 'success');
          this.router.navigate(['/account/login']);
        },
        error: (err)=>{
          console.error("Error updating password:", err);
        }
      });
}
}