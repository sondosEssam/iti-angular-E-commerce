import { Routes } from '@angular/router';
import { Signup } from './components/signup/signup';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Profile } from './components/profile/profile';
import { authGuard } from './guards/auth-guard';
import { ForgetPassword } from './components/forget-password/forget-password';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full' },
    {path:'home', component:Home},
    {path:'forgetpassword', component:ForgetPassword},
    {path:'signup', component:Signup},
    {path:'login', component:Login},
    {path:'profile', component:Profile, canActivate: [authGuard]}
];
