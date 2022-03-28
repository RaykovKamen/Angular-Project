import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CartComponent } from './feature/cart/cart.component';
import { PageNotFoundPageComponent } from './feature/page-not-found-page/page-not-found-page.component';
import { ProductsComponent } from './feature/products/products.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: '**', component: PageNotFoundPageComponent },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
