import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { CategoryPageComponent } from './pages/category/category.component';
import { ProductsPageComponent } from './pages/products/products.component';
import { ProductDetailPageComponent } from './pages/product-detail/product-detail.component';
import { CartPageComponent } from './pages/cart/cart.component';
import { CheckoutPageComponent } from './pages/checkout/checkout.component';
import { authGuard } from './guards/auth-guard';
import { OrderConfirmationPageComponent } from './pages/order-confirmation/order-confirmation.component';
import { AboutComponent } from './pages/static/about/about.component';
import { ContactComponent } from './pages/static/contact/contact.component';
import { TermsComponent } from './pages/static/terms/terms.component';
import { PrivacyComponent } from './pages/static/privacy/privacy.component';
import { AdminDashboardPageComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ProductManagerPageComponent } from './pages/admin/product-manager/product-manager.component';
import { ProductCreatePageComponent } from './pages/admin/product-create/product-create.component';
import { ProductEditPageComponent } from './pages/admin/product-edit/product-edit.component';
import { UserManagerPageComponent } from './pages/admin/user-manager/user-manager.component';
import { adminGuard } from './guards/admin-guard';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { ForgetPassword } from './components/forget-password/forget-password';
import { Profile } from './components/profile/profile';
import { OrdersPageComponent } from './pages/orders/orders.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'category/:id', component: CategoryPageComponent },
    { path: 'products', component: ProductsPageComponent },
    { path: 'product/:id', component: ProductDetailPageComponent },
    { path: 'cart', component: CartPageComponent },
    { path: 'checkout', component: CheckoutPageComponent, canActivate: [authGuard] },
    { path: 'order-confirmation/:orderId', component: OrderConfirmationPageComponent },
    { path: 'orders', component: OrdersPageComponent, canActivate: [authGuard] },
    { path: 'profile', component: Profile, canActivate: [authGuard] },

    { path: 'account/login', component: Login },
    { path: 'account/register', component: Signup },
    { path: 'account/forgot-password', component: ForgetPassword },

    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'privacy', component: PrivacyComponent },

    { path: 'admin/dashboard', component: AdminDashboardPageComponent, canActivate: [adminGuard] },
    { path: 'admin/products', component: ProductManagerPageComponent, canActivate: [adminGuard] },
    { path: 'admin/products/new', component: ProductCreatePageComponent, canActivate: [adminGuard] },
    { path: 'admin/products/:id/edit', component: ProductEditPageComponent, canActivate: [adminGuard] },
    { path: 'admin/users', component: UserManagerPageComponent, canActivate: [adminGuard] },

    { path: '**', redirectTo: '' }
];
