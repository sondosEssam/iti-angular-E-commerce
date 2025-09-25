import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Http } from '../../services/http';
import { IUser } from '../../interface/iuser';
import { Token } from '../../services/token';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  constructor(
    private router: Router,
    private http: Http,
    private token: Token
  ) {}
  ngOnInit(): void {
    if (this.token.getToken()) {
      this.router.navigate(['/profile']);
    }
  }
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.valid) {
      this.http.getUsers().subscribe({
        next: (data) => {
          // check email
          if (data.find(u => u.email === this.form.value.email)) {
            alert("Email already exists");
            return;
          }

          const val = this.form.value;

          // check password
          if (val.password !== val.confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
          }

          // prepare user
          const token = this.token.generateToken();
          const user: IUser = {
            id: data.length + 1,
            name: val.name!,
            email: val.email!,
            password: val.password!,
            token
          };

          // save user
          this.http.addUser(user).subscribe({
            next: (data) => {
              this.token.setToken(data.token!);
              localStorage.setItem("auth", JSON.stringify(data.token));
              console.log("User added:", data);
              this.router.navigate(['home']);
            },
            error: (err) => {
              console.error("Error adding user:", err);
            }
          });
        },
        error: (err) => {
          console.error("Error fetching users:", err);
        }
      });
    } else {
      console.log("Form is invalid");
    }
  }
}
