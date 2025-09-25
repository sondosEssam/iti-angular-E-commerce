import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Http } from '../../services/http';
import { IUser } from '../../interface/iuser';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPassword {
  constructor(private http: Http, private router:Router) { }
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
      alert("Please fill all fields");
      return;
    }
      const {email, new_password, confirm_new_password} = this.form.value;
      if(!this.users.find(u=>u.email == email)){
        alert("Email not found. please sign up");
        this.router.navigate(['/sign-up']);
        return;
      }
      if(new_password !== confirm_new_password){
        alert("Password and Confirm Password do not match");
        return;
      }
      const user= this.users.find(u=>u.email == email);
      if (!user) {
          alert("User not found");
          return;
        }
      user.password = new_password!;
      // update password
      this.http.updatePassword(user).subscribe({
        next: (data)=>{
          alert("Password updated successfully");
          this.router.navigate(['/login']);
        },
        error: (err)=>{
          console.error("Error updating password:", err);
        }
      });
}
}