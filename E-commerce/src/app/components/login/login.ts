import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Http } from '../../services/http';
import { Token } from '../../services/token';
import { IUser } from '../../interface/iuser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
constructor(private http: Http, private token:Token, private router:Router) 
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
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
onSubmit()
{
  if(!this.form.valid)
  {
    alert("Please fill all fields");
    return;
  }
   const {email, password} = this.form.value;
  const user = this.users.find(u => u.email === email && u.password === password);
  if(user)
  {
    this.token.setToken(user.token!);
    localStorage.setItem("auth", JSON.stringify(user.token));
    this.router.navigate(['/home']);
  }
  else
  {
    alert("Invalid email or password");
  }

}
}