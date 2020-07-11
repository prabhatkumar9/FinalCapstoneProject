import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';

import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ProductsComponent } from './admin/products/products.component';
import { AddProductComponent } from './admin/products/add-product/add-product.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './main/home/home.component';
import { CartComponent } from './main/home/cart/cart.component';
import { FiltersComponent } from './main/home/filters/filters.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { ShippingComponent } from './shipping/shipping.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'update-product/:id',
    component: UpdateProductComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'orderHistory',
    component: OrderhistoryComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin',
    component: ProductsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: 'shipping',
    component: ShippingComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponent = [
  AccessDeniedComponent,
  ProductsComponent,
  AddProductComponent,
  FooterComponent,
  HeaderComponent,
  LoginComponent,
  HomeComponent,
  CartComponent,
  FiltersComponent,
  NavMenuComponent,
  OrderhistoryComponent,
  ProfileComponent,
  SignupComponent,
  ShippingComponent,
  UpdateProductComponent,
];
