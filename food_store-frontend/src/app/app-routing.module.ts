import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './products/pages/home-page/home-page.component';
import { DetailPageComponent } from './products/pages/detail-page/detail-page.component';
import { CartPageComponent } from './products/pages/cart-page/cart-page.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { CheckoutPageComponent } from './products/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'search/:searchTerm',
    component: HomePageComponent
  },
  {
    path: 'tag/:tag',
    component: HomePageComponent
  },
  {
    path: 'food/:id',
    component: DetailPageComponent
  },
  {
    path: 'cart-page',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ) 
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }