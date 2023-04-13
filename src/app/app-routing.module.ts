import { ProductsComponent } from './components/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { BrandsComponent } from './components/brands/brands.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent, title: 'Cart' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'products', component: ProductsComponent, title: 'Products' },
  { path: 'products/:id', component: ProductDetailsComponent, title: 'productDetails' },
  { path: 'brands', component: BrandsComponent, title: 'Brands' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'allorders', component: AllordersComponent, title: 'All Orders' },
  { path: '**', component: NotfoundComponent, title: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
